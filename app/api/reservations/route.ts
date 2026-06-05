import { NextRequest, NextResponse } from "next/server";
import { sendAdminNotification, sendClientConfirmation, type ReservationPayload } from "@/lib/emails";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      type_intervention = "unique",
      prenom, nom, email, telephone,
      adresse, ville, code_postal,
      zone, notes,
      taille_bassin, type_traitement, etat_eau, frequence, montant_mensuel,
    } = body;

    // ── Validation champs obligatoires ───────────────────────────────────────
    if (!prenom || !nom || !email || !telephone || !adresse || !ville || !code_postal || !zone) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const payload: ReservationPayload = {
      type_intervention,
      prenom, nom, email, telephone,
      adresse, ville, code_postal,
      zone,
      notes:           notes           || null,
      etat_eau:        etat_eau        || null,
      taille_bassin:   taille_bassin   || null,
      type_traitement: type_traitement || null,
      frequence:       frequence       || null,
      montant_mensuel: montant_mensuel || null,
    };

    // ── Sauvegarde Supabase (optionnelle — n'bloque jamais les emails) ────────
    try {
      const { error: dbError } = await supabaseAdmin
        .from("reservations")
        .insert({
          statut:           "en_attente",
          type_intervention,
          prenom, nom, email, telephone,
          adresse, ville, code_postal,
          zone,
          notes:            notes            || null,
          etat_eau:         etat_eau         || null,
          taille_bassin:    taille_bassin    || null,
          type_traitement:  type_traitement  || null,
          frequence:        frequence        || null,
          montant_mensuel:  montant_mensuel  || null,
        });
      if (dbError) console.error("Supabase insert error:", dbError);
    } catch (dbErr) {
      console.error("Supabase unavailable:", dbErr);
      // On continue quand même
    }

    // ── Envoi emails ─────────────────────────────────────────────────────────
    await Promise.all([
      sendAdminNotification(payload),
      sendClientConfirmation(payload),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err) {
    console.error("POST /api/reservations error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
