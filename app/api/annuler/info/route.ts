import { NextResponse } from "next/server";
// MVP : annulation non activée
export async function GET() {
  return NextResponse.json({ error: "Non disponible" }, { status: 503 });
}
