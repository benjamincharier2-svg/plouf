import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { sendPaymentLink } from "@/lib/emails";

// GET /api/reservations/[id]/valider?token=xxx
// Appelé depuis l'email admin — valide la réservation et envoie le lien de paiement au client
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const { id } = params;

    if (!token) {
      return new NextResponse("Token manquant", { status: 400 });
    }

    // Vérifier le token
    const { data: reservation, error } = await supabaseAdmin
      .from("reservations")
      .select("*")
      .eq("id", id)
      .eq("token_validation", token)
      .single();

    if (error || !reservation) {
      return new NextResponse("Réservation introuvable ou token invalide", { status: 404 });
    }

    if (reservation.statut !== "en_attente") {
      return new NextResponse(
        `Cette réservation est déjà en statut "${reservation.statut}"`,
        { status: 409 }
      );
    }

    // Créer un PaymentIntent confirmable côté client via Checkout Session
    const acompteEuros = Math.round(reservation.montant_mensuel * 6 * 0.5);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Acompte abonnement Plouf — saison mai–octobre`,
              description: `${reservation.prenom} ${reservation.nom} — ${reservation.frequence === "bimensuel" ? "Bimensuel" : "Hebdomadaire"}`,
            },
            unit_amount: acompteEuros * 100,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        capture_method: "manual",
        metadata: {
          reservation_id: reservation.id,
        },
      },
      customer_email: reservation.email,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/confirmation?reservation=${reservation.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/reserver?annule=1`,
      metadata: {
        reservation_id: reservation.id,
        token_annulation: reservation.token_annulation,
      },
    });

    // Mettre à jour le statut en "validé"
    await supabaseAdmin
      .from("reservations")
      .update({
        statut: "validé",
        "validé_at": new Date().toISOString(),
        stripe_payment_intent_id: session.payment_intent as string,
      })
      .eq("id", id);

    // Envoyer le lien de paiement au client
    await sendPaymentLink(reservation, session.url!);

    // Répondre à l'admin avec une page HTML simple
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="fr">
      <head><meta charset="UTF-8"><title>Réservation validée</title>
      <style>body{font-family:system-ui,sans-serif;max-width:500px;margin:80px auto;padding:20px;text-align:center}
      h1{color:#1A00CC}p{color:#555}a{color:#1A00CC}</style></head>
      <body>
        <h1>✅ Réservation validée</h1>
        <p>Le lien de paiement a été envoyé à <strong>${reservation.email}</strong>.</p>
        <p>Le client devra confirmer son paiement en cliquant sur le lien reçu par email.</p>
      </body></html>`,
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  } catch (err) {
    console.error("GET /api/reservations/[id]/valider error:", err);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
