import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

// GET /api/annuler/info?token=xxx
// Récupère les infos de la réservation depuis le token d'annulation
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token manquant" }, { status: 400 });
  }

  const { data: reservation, error } = await supabaseAdmin
    .from("reservations")
    .select("id, statut, montant_mensuel, creneau_date, creneau_heure")
    .eq("token_annulation", token)
    .single();

  if (error || !reservation) {
    return NextResponse.json({ error: "Lien invalide ou expiré" }, { status: 404 });
  }

  if (reservation.statut === "annulé") {
    return NextResponse.json({ already: true }, { status: 409 });
  }

  // Calculer les frais éventuels
  const now = new Date();
  const creneauDate = new Date(`${reservation.creneau_date}T${reservation.creneau_heure}:00`);
  const heuresAvant = (creneauDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  const frais_eventuels =
    heuresAvant < 24 && reservation.statut === "payé"
      ? Math.round(reservation.montant_mensuel * 0.25 * 100) / 100
      : 0;

  return NextResponse.json({
    id: reservation.id,
    frais_eventuels,
  });
}
