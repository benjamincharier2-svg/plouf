import { Resend } from "resend";

// ── Types ──────────────────────────────────────────────────────────────────

export interface ReservationPayload {
  type_intervention: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  code_postal: string;
  zone: string;
  etat_eau?: string | null;
  taille_bassin?: string | null;
  type_traitement?: string | null;
  frequence?: string | null;
  montant_mensuel?: number | null;
  notes?: string | null;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function formatZone(z: string) {
  return z === "bordeaux_metropole" ? "Bordeaux Métropole" : "Médoc, Bassin d'Arcachon";
}
function formatTaille(t: string | null | undefined) {
  if (!t) return "N/A";
  return t === "petit" ? "Petite (< 30 m³)" : t === "moyen" ? "Moyenne (30–60 m³)" : "Grande (> 60 m³)";
}
function formatFrequence(f: string | null | undefined) {
  if (!f) return "N/A";
  return f === "bimensuel" ? "2×/mois (Bimensuel)" : "4×/mois (Hebdomadaire)";
}
function formatEau(e: string | null | undefined) {
  if (!e) return "N/A";
  const map: Record<string, string> = {
    claire: "Claire ✨",
    trouble: "Trouble 😐",
    verte: "Verte 🟢",
    je_sais_pas: "Je ne sais pas",
  };
  return map[e] ?? e;
}
function now() {
  return new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });
}

// ── Notification admin ─────────────────────────────────────────────────────

export async function sendAdminNotification(r: ReservationPayload) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "contact@ploufpiscines.fr";
  const isAbo = r.type_intervention === "abonnement";

  const rows = [
    ["Type", isAbo ? "🏊 Abonnement saisonnier" : "⚡ Intervention express"],
    ["Client", `${r.prenom} ${r.nom}`],
    ["Téléphone", `<a href="tel:${r.telephone}" style="color:#1313D6">${r.telephone}</a>`],
    ["Email", `<a href="mailto:${r.email}" style="color:#1313D6">${r.email}</a>`],
    ["Adresse", `${r.adresse}, ${r.code_postal} ${r.ville}`],
    ["Zone", formatZone(r.zone)],
    ["État de l'eau", formatEau(r.etat_eau)],
    ...(isAbo ? [
      ["Bassin", formatTaille(r.taille_bassin)],
      ["Traitement", r.type_traitement === "sel" ? "Sel, électrolyse" : "Chlore"],
      ["Fréquence", formatFrequence(r.frequence)],
      ["Estimation", r.montant_mensuel ? `<strong style="color:#1313D6">${r.montant_mensuel} €/mois</strong>` : "N/A"],
    ] : []),
    ...(r.notes ? [["Notes", r.notes]] : []),
  ];

  const tableRows = rows
    .map(([label, value], i) =>
      `<tr style="background:${i % 2 === 0 ? "#f9f9f9" : "#fff"};">
        <td style="padding:10px 14px;font-weight:600;color:#555;white-space:nowrap;">${label}</td>
        <td style="padding:10px 14px;color:#222;">${value}</td>
      </tr>`
    )
    .join("");

  await resend.emails.send({
    from: "Plouf Réservations <reservations@ploufpiscines.fr>",
    to: ADMIN_EMAIL,
    subject: `🆕 ${isAbo ? "Abonnement" : "Express"} · ${r.prenom} ${r.nom} · ${r.ville}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <div style="background:#1313D6;border-radius:12px 12px 0 0;padding:20px 24px;">
          <h1 style="color:#fff;margin:0;font-size:22px;">Nouvelle demande Plouf 🌊</h1>
          <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:13px;">Reçue le ${now()}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-top:none;">
          ${tableRows}
        </table>

        <div style="margin-top:24px;padding:16px;background:#E7EBFF;border-radius:10px;font-size:13px;color:#333;">
          <strong>À faire :</strong> rappeler ${r.prenom} au
          <a href="tel:${r.telephone}" style="color:#1313D6;font-weight:bold;">${r.telephone}</a>
          sous 2h pour organiser l'intervention.
        </div>

        <p style="color:#aaa;font-size:11px;margin-top:20px;text-align:center;">
          ploufpiscines.fr · contact@ploufpiscines.fr
        </p>
      </div>
    `,
  });
}

// ── Confirmation client ────────────────────────────────────────────────────

export async function sendClientConfirmation(r: ReservationPayload) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const isAbo = r.type_intervention === "abonnement";
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://ploufpiscines.fr";

  await resend.emails.send({
    from: "Plouf Piscines <reservations@ploufpiscines.fr>",
    to: r.email,
    subject: `✅ Demande reçue, on vous rappelle sous 2h !`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;">

        <!-- Header -->
        <div style="background:#1313D6;border-radius:12px 12px 0 0;padding:24px;">
          <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">Votre demande est bien envoyée 🌊</h1>
          <p style="color:rgba(255,255,255,0.75);margin:8px 0 0;font-size:14px;">Merci ${r.prenom} !</p>
        </div>

        <!-- Body -->
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:28px;">

          <p style="font-size:16px;color:#222;margin:0 0 16px;">
            On a bien reçu votre demande de
            <strong>${isAbo ? "abonnement saisonnier" : "intervention express"}</strong>
            à <strong>${r.ville}</strong>.
          </p>

          <!-- Bloc rassurant -->
          <div style="background:#E7EBFF;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0;font-size:15px;color:#1313D6;font-weight:600;">📞 On vous rappelle sous 2h</p>
            <p style="margin:6px 0 0;font-size:14px;color:#444;">
              Notre équipe va vous contacter au <strong>${r.telephone}</strong> pour
              organiser l'intervention à votre convenance.
            </p>
          </div>

          <!-- Récap -->
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr style="background:#f9f9f9;">
              <td style="padding:9px 14px;font-weight:600;color:#555;font-size:13px;white-space:nowrap;">Type</td>
              <td style="padding:9px 14px;color:#222;font-size:13px;">${isAbo ? "Abonnement saisonnier" : "Intervention express"}</td>
            </tr>
            <tr style="background:#fff;">
              <td style="padding:9px 14px;font-weight:600;color:#555;font-size:13px;white-space:nowrap;">Adresse</td>
              <td style="padding:9px 14px;color:#222;font-size:13px;">${r.adresse}, ${r.code_postal} ${r.ville}</td>
            </tr>
            ${isAbo && r.montant_mensuel ? `
            <tr style="background:#f9f9f9;">
              <td style="padding:9px 14px;font-weight:600;color:#555;font-size:13px;white-space:nowrap;">Estimation</td>
              <td style="padding:9px 14px;color:#1313D6;font-size:13px;font-weight:700;">${r.montant_mensuel} €/mois</td>
            </tr>` : ""}
          </table>

          <!-- CTA conseils -->
          <div style="text-align:center;margin-bottom:8px;">
            <p style="font-size:14px;color:#555;margin:0 0 12px;">En attendant notre appel, découvrez nos conseils d'entretien :</p>
            <a href="${APP_URL}/conseils"
               style="display:inline-block;background:#1313D6;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:15px;font-weight:600;">
              Nos conseils d'entretien →
            </a>
          </div>

        </div>

        <p style="color:#aaa;font-size:11px;margin-top:20px;text-align:center;">
          Plouf Piscines · 05 54 54 08 80 · contact@ploufpiscines.fr<br>
          <a href="${APP_URL}" style="color:#aaa;">ploufpiscines.fr</a>
        </p>

      </div>
    `,
  });
}
