import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { sendCancellationConfirmation } from "@/lib/emails";

// POST /api/reservations/[id]/annuler  (appelé depuis la page /annuler/[token])
// GET  /api/reservations/[id]/annuler?token=xxx  (depuis email admin — refus direct)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  return annulerReservation(params.id, token ?? "", false);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json().catch(() => ({}));
  const token = body.token ?? "";

  return annulerReservation(params.id, token, true);
}

async function annulerReservation(id: string, token: string, isClientRequest: boolean) {
  try {
    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 400 });
    }

    const { data: reservation, error } = await supabaseAdmin
      .from("reservations")
      .select("*")
      .eq("id", id)
      .eq("token_annulation", token)
      .single();

    if (error || !reservation) {
      return NextResponse.json(
        { error: "Réservation introuvable ou token invalide" },
        { status: 404 }
      );
    }

    if (reservation.statut === "annulé") {
      return NextResponse.json({ error: "Déjà annulée" }, { status: 409 });
    }

    // Calculer les frais d'annulation
    let frais = 0;
    const now = new Date();
    const creneauDate = new Date(`${reservation.creneau_date}T${reservation.creneau_heure}:00`);
    const heuresAvant = (creneauDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (heuresAvant < 24 && reservation.statut === "payé") {
      // 25 % du montant mensuel
      frais = Math.round(reservation.montant_mensuel * 0.25 * 100) / 100;
    }

    // Annuler ou capturer partiellement via Stripe
    if (reservation.stripe_payment_intent_id) {
      try {
        if (frais > 0) {
          // Capturer uniquement le montant des frais
          await stripe.paymentIntents.capture(
            reservation.stripe_payment_intent_id,
            { amount_to_capture: Math.round(frais * 100) }
          );
        } else {
          // Annuler la pré-autorisation
          await stripe.paymentIntents.cancel(
            reservation.stripe_payment_intent_id
          );
        }
      } catch (stripeErr) {
        console.error("Stripe error during cancellation:", stripeErr);
        // On continue quand même pour mettre à jour la BDD
      }
    }

    // Mettre à jour le statut
    await supabaseAdmin
      .from("reservations")
      .update({
        statut: "annulé",
        "annulé_at": new Date().toISOString(),
      })
      .eq("id", id);

    // Envoyer email de confirmation d'annulation au client
    await sendCancellationConfirmation(reservation, frais);

    if (isClientRequest) {
      return NextResponse.json({ success: true, frais });
    }

    // Réponse HTML pour l'admin
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="fr">
      <head><meta charset="UTF-8"><title>Réservation annulée</title>
      <style>body{font-family:system-ui,sans-serif;max-width:500px;margin:80px auto;padding:20px;text-align:center}
      h1{color:#333}p{color:#555}</style></head>
      <body>
        <h1>Réservation annulée</h1>
        <p>La réservation de <strong>${reservation.prenom} ${reservation.nom}</strong> a été annulée.</p>
        <p>Un email de confirmation a été envoyé au client.</p>
        ${frais > 0 ? `<p>Frais d'annulation prélevés : <strong>${frais} €</strong></p>` : ""}
      </body></html>`,
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (err) {
    console.error("annulerReservation error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
