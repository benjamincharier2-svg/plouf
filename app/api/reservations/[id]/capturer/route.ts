import { NextResponse } from "next/server";
// MVP : paiement non activé
export async function POST() {
  return NextResponse.json({ error: "Non disponible" }, { status: 503 });
}
