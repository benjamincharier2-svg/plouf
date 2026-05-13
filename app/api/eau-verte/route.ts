import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const prenom = formData.get("prenom") as string;
    const nom = formData.get("nom") as string;
    const email = formData.get("email") as string;
    const telephone = formData.get("telephone") as string;
    const description = formData.get("description") as string;

    if (!prenom || !nom || !email || !telephone || !description) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Notification à l'admin
    await resend.emails.send({
      from: "Plouf Eau Verte <reservations@ploufpiscines.fr>",
      to: ADMIN_EMAIL,
      subject: `🟢 Urgence eau verte — ${prenom} ${nom}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1A00CC;">Demande eau verte reçue</h1>
          <p>À rappeler sous 2h.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="background: #EEE9FF;">
              <td style="padding: 10px 12px; font-weight: bold;">Nom</td>
              <td style="padding: 10px 12px;">${prenom} ${nom}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold;">Email</td>
              <td style="padding: 10px 12px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px 12px; font-weight: bold;">Téléphone</td>
              <td style="padding: 10px 12px;"><a href="tel:${telephone}">${telephone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; font-weight: bold;">Description</td>
              <td style="padding: 10px 12px;">${description.replace(/\n/g, "<br/>")}</td>
            </tr>
          </table>
        </div>
      `,
    });

    // Confirmation au client
    await resend.emails.send({
      from: "Plouf Piscines <contact@ploufpiscines.fr>",
      to: email,
      subject: "On a bien reçu votre demande — rappel sous 2h",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1A00CC;">Demande reçue !</h1>
          <p>Bonjour ${prenom},</p>
          <p>Nous avons bien reçu votre demande concernant votre piscine.
          Notre équipe va analyser votre situation et vous contacte <strong>sous 2h</strong>
          au <strong>${telephone}</strong>.</p>
          <p style="color: #666;">En attendant, si la situation est très urgente, répondez simplement à cet email.</p>
          <p>À très vite,<br/>L'équipe Plouf 🌊</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/eau-verte error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
