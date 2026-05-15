import { NextResponse } from "next/server";
// MVP : paiement non activé
export async function GET() {
  return NextResponse.json({ error: "Non disponible" }, { status: 503 });
}
