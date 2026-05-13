import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { sendAdminNotification } from "@/lib/emails";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      prenom,
      nom,
      email,
      telephone,
      adresse,
      ville,
      code_postal,
      notes,
      zone,
      taille_bassin,
      type_traitement,
      etat_eau,
      frequence,
      montant_mensuel,
      creneau_date,
      creneau_heure,
    } = body;

    // Validation basique
    if (
      !prenom || !nom || !email || !telephone || !adresse || !ville ||
      !code_postal || !zone || !taille_bassin || !type_traitement ||
      !etat_eau || !frequence || !montant_mensuel || !creneau_date || !creneau_heure
    ) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    // Acompte = 50% de la saison (6 mois)
    const acompteEuros = Math.round(montant_mensuel * 6 * 0.5);
    const acomptecentimes = acompteEuros * 100;

    // Créer une pré-autorisation Stripe (capture manuelle)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: acomptecentimes,
      currency: "eur",
      capture_method: "manual",
      payment_method_types: ["card"],
      description: `Plouf — Acompte abonnement ${prenom} ${nom}`,
      metadata: {
        prenom,
        nom,
        email,
        zone,
        frequence,
        taille_bassin,
        creneau_date,
      },
    });

    // Insérer en base
    const { data, error } = await supabaseAdmin
      .from("reservations")
      .insert({
        prenom,
        nom,
        email,
        telephone,
        adresse,
        ville,
        code_postal,
        notes: notes || null,
        zone,
        taille_bassin,
        type_traitement,
        etat_eau,
        frequence,
        montant_mensuel,
        creneau_date,
        creneau_heure,
        stripe_payment_intent_id: paymentIntent.id,
        statut: "en_attente",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
    }

    // Notifier l'admin
    await sendAdminNotification(data);

    return NextResponse.json(
      {
        success: true,
        id: data.id,
        client_secret: paymentIntent.client_secret,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/reservations error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
