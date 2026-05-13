import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { sendPaymentConfirmation } from "@/lib/emails";

// POST /api/reservations/[id]/capturer
// Capture le paiement après intervention (appel manuel ou automatisé)
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérification clé API simple
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = params;

    const { data: reservation, error } = await supabaseAdmin
      .from("reservations")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !reservation) {
      return NextResponse.json({ error: "Réservation introuvable" }, { status: 404 });
    }

    if (reservation.statut === "payé") {
      return NextResponse.json({ error: "Déjà capturé" }, { status: 409 });
    }

    if (!reservation.stripe_payment_intent_id) {
      return NextResponse.json({ error: "Pas de PaymentIntent associé" }, { status: 400 });
    }

    // Capturer le paiement Stripe
    await stripe.paymentIntents.capture(reservation.stripe_payment_intent_id);

    // Mettre à jour le statut
    await supabaseAdmin
      .from("reservations")
      .update({
        statut: "payé",
        "payé_at": new Date().toISOString(),
      })
      .eq("id", id);

    // Envoyer email de confirmation au client
    await sendPaymentConfirmation(reservation);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/reservations/[id]/capturer error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
