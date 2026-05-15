import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "contact@ploufpiscines.fr";

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
  return z === "bordeaux_metropole" ? "Bordeaux Métropole" : "Médoc — Bassin d'Arcachon";
}
function formatTaille(t: string | null | undefined) {
  if (!t) return "—";
  return t === "petit" ? "Petite (< 30 m³)" : t === "moyen" ? "Moyenne (30–60 m³)" : "Grande (> 60 m³)";
}
function formatFrequence(f: string | null | undefined) {
  if (!f) return "—";
  return f === "bimensuel" ? "2×/mois (Bimensuel)" : "4×/mois (Hebdomadaire)";
}
function formatEau(e: string | null | undefined) {
  if (!e) return "—";
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
      ["Traitement", r.type_traitement === "sel" ? "Sel — électrolyse" : "Chlore"],
      ["Fréquence", formatFrequence(r.frequence)],
      ["Estimation", r.montant_mensuel ? `<strong style="color:#1313D6">${r.montant_mensuel} €/mois</strong>` : "—"],
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
    from: "Plouf Réservations <onboarding@resend.dev>",
    to: ADMIN_EMAIL,
    subject: `🆕 ${isAbo ? "Abonnement" : "Express"} — ${r.prenom} ${r.nom} · ${r.ville}`,
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
          ploufpiscines.fr — contact@ploufpiscines.fr
        </p>
      </div>
    `,
  });
}
