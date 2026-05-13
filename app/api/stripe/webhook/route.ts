import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/server";
import Stripe from "stripe";

// Important : lire le raw body pour la vérification de signature Stripe
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Signature ou secret manquant" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // Le client a complété le paiement via Checkout Session
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const reservationId = session.metadata?.reservation_id;

        if (!reservationId) break;

        // Mettre à jour le statut en "confirmé" (paiement autorisé, pas encore capturé)
        await supabaseAdmin
          .from("reservations")
          .update({
            statut: "confirmé",
            "confirmé_at": new Date().toISOString(),
            stripe_payment_intent_id: session.payment_intent as string,
          })
          .eq("id", reservationId)
          .in("statut", ["en_attente", "validé"]);

        break;
      }

      // Paiement capturé avec succès
      case "payment_intent.amount_capturable_updated": {
        // Pas d'action nécessaire — la capture se fait manuellement
        break;
      }

      default:
        // Ignorer les autres événements
        break;
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Erreur traitement webhook" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
