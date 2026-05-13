import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

// ── Types ──────────────────────────────────────────────────────────────────

interface ReservationData {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  code_postal: string;
  zone: string;
  taille_bassin: string;
  type_traitement: string;
  etat_eau: string;
  frequence: string;
  montant_mensuel: number;
  creneau_date: string;
  creneau_heure: string;
  token_validation: string;
  token_annulation: string;
  notes?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function formatZone(zone: string) {
  return zone === "bordeaux_metropole" ? "Bordeaux Métropole" : "Médoc — Bassin d'Arcachon";
}
function formatTaille(t: string) {
  return t === "petit" ? "Petit (< 30 m²)" : t === "moyen" ? "Moyen (30–60 m²)" : "Grand (> 60 m²)";
}
function formatFrequence(f: string) {
  return f === "bimensuel" ? "Bimensuel (2×/mois)" : "Hebdomadaire (4×/mois)";
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// ── 1. Notification admin (nouvelle réservation en attente) ────────────────

export async function sendAdminNotification(r: ReservationData) {
  const validationUrl = `${APP_URL}/api/reservations/${r.id}/valider?token=${r.token_validation}`;
  const annulationUrl = `${APP_URL}/api/reservations/${r.id}/annuler?token=${r.token_annulation}`;
  const acompte = (r.montant_mensuel * 6 * 0.5).toFixed(2);

  await resend.emails.send({
    from: "Plouf Réservations <reservations@ploufpiscines.fr>",
    to: ADMIN_EMAIL,
    subject: `🆕 Nouvelle réservation — ${r.prenom} ${r.nom} (${formatDate(r.creneau_date)})`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1A00CC; margin-bottom: 4px;">Nouvelle réservation !</h1>
        <p style="color: #666; margin-top: 0;">À valider avant envoi du lien de paiement.</p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background: #EEE9FF;">
            <td style="padding: 10px 12px; font-weight: bold; color: #1A00CC;">Client</td>
            <td style="padding: 10px 12px;">${r.prenom} ${r.nom}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: bold; color: #555;">Email</td>
            <td style="padding: 10px 12px;">${r.email}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px 12px; font-weight: bold; color: #555;">Téléphone</td>
            <td style="padding: 10px 12px;">${r.telephone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: bold; color: #555;">Adresse</td>
            <td style="padding: 10px 12px;">${r.adresse}, ${r.code_postal} ${r.ville}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px 12px; font-weight: bold; color: #555;">Zone</td>
            <td style="padding: 10px 12px;">${formatZone(r.zone)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: bold; color: #555;">Bassin</td>
            <td style="padding: 10px 12px;">${formatTaille(r.taille_bassin)} — ${r.type_traitement === "chlore" ? "Chlore" : "Sel"}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 10px 12px; font-weight: bold; color: #555;">État eau</td>
            <td style="padding: 10px 12px;">${r.etat_eau}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: bold; color: #555;">Formule</td>
            <td style="padding: 10px 12px;">${formatFrequence(r.frequence)}</td>
          </tr>
          <tr style="background: #EEE9FF;">
            <td style="padding: 10px 12px; font-weight: bold; color: #1A00CC;">Montant mensuel</td>
            <td style="padding: 10px 12px; font-weight: bold; color: #1A00CC;">${r.montant_mensuel} € / mois</td>
          </tr>
          <tr style="background: #EEE9FF;">
            <td style="padding: 10px 12px; font-weight: bold; color: #1A00CC;">Acompte saison</td>
            <td style="padding: 10px 12px; font-weight: bold; color: #1A00CC;">${acompte} €</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: bold; color: #555;">Premier créneau</td>
            <td style="padding: 10px 12px;">${formatDate(r.creneau_date)} à ${r.creneau_heure}</td>
          </tr>
          ${r.notes ? `<tr style="background: #f9f9f9;"><td style="padding: 10px 12px; font-weight: bold; color: #555;">Notes</td><td style="padding: 10px 12px;">${r.notes}</td></tr>` : ""}
        </table>

        <div style="margin: 30px 0; display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="${validationUrl}" style="background: #1A00CC; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            ✅ Valider et envoyer le lien de paiement
          </a>
          <a href="${annulationUrl}" style="background: #f5f5f5; color: #333; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 8px;">
            ❌ Refuser la réservation
          </a>
        </div>

        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          ID réservation : ${r.id}
        </p>
      </div>
    `,
  });
}

// ── 2. Lien de paiement (envoyé au client après validation admin) ──────────

export async function sendPaymentLink(r: ReservationData, paymentUrl: string) {
  const annulationUrl = `${APP_URL}/annuler/${r.token_annulation}`;
  const acompte = (r.montant_mensuel * 6 * 0.5).toFixed(2);

  await resend.emails.send({
    from: "Plouf Piscines <contact@ploufpiscines.fr>",
    to: r.email,
    subject: `Votre lien de paiement Plouf — ${r.prenom}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1A00CC;">Votre réservation est validée !</h1>
        <p>Bonjour ${r.prenom},</p>
        <p>Bonne nouvelle — nous avons validé votre réservation d'abonnement piscine.
        Il ne reste plus qu'à confirmer votre paiement pour réserver votre créneau.</p>

        <div style="background: #EEE9FF; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #1A00CC; margin-top: 0;">Récapitulatif</h3>
          <p style="margin: 4px 0;"><strong>Formule :</strong> ${formatFrequence(r.frequence)}</p>
          <p style="margin: 4px 0;"><strong>Bassin :</strong> ${formatTaille(r.taille_bassin)}</p>
          <p style="margin: 4px 0;"><strong>Traitement :</strong> ${r.type_traitement === "chlore" ? "Chlore" : "Sel"}</p>
          <p style="margin: 4px 0;"><strong>Premier passage :</strong> ${formatDate(r.creneau_date)} à ${r.creneau_heure}</p>
          <p style="margin: 8px 0 0; font-size: 18px; font-weight: bold; color: #1A00CC;">
            Acompte à régler : ${acompte} €
          </p>
          <p style="margin: 4px 0; color: #666; font-size: 13px;">
            (50 % de la saison mai–octobre, soit ${r.montant_mensuel} €/mois × 6 mois)
          </p>
        </div>

        <a href="${paymentUrl}" style="background: #1A00CC; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block; margin: 8px 0 24px;">
          Payer l'acompte — ${acompte} €
        </a>

        <p style="color: #666; font-size: 13px;">
          Ce lien est valable 48h. Après paiement, vous recevrez une confirmation par email.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />

        <p style="color: #999; font-size: 12px;">
          Besoin d'annuler ? <a href="${annulationUrl}" style="color: #1A00CC;">Cliquez ici</a>
          (gratuit si annulation > 24h avant l'intervention).<br />
          Des questions ? Répondez à cet email ou écrivez à contact@ploufpiscines.fr
        </p>
      </div>
    `,
  });
}

// ── 3. Confirmation de paiement (envoyé au client après paiement) ─────────

export async function sendPaymentConfirmation(r: ReservationData) {
  const annulationUrl = `${APP_URL}/annuler/${r.token_annulation}`;
  const acompte = (r.montant_mensuel * 6 * 0.5).toFixed(2);

  await resend.emails.send({
    from: "Plouf Piscines <contact@ploufpiscines.fr>",
    to: r.email,
    subject: `✅ Paiement confirmé — à bientôt, ${r.prenom} !`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1A00CC;">C'est confirmé ! 🎉</h1>
        <p>Bonjour ${r.prenom},</p>
        <p>Votre paiement de <strong>${acompte} €</strong> a bien été reçu. Votre abonnement Plouf est activé pour la saison mai–octobre.</p>
        <p>Notre technicien sera chez vous le <strong>${formatDate(r.creneau_date)} à ${r.creneau_heure}</strong>.</p>

        <div style="background: #EEE9FF; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #1A00CC; margin-top: 0;">Votre abonnement</h3>
          <p style="margin: 4px 0;"><strong>Adresse :</strong> ${r.adresse}, ${r.code_postal} ${r.ville}</p>
          <p style="margin: 4px 0;"><strong>Formule :</strong> ${formatFrequence(r.frequence)}</p>
          <p style="margin: 4px 0;"><strong>Bassin :</strong> ${formatTaille(r.taille_bassin)} — ${r.type_traitement === "chlore" ? "Chlore" : "Sel"}</p>
          <p style="margin: 4px 0;"><strong>Premier passage :</strong> ${formatDate(r.creneau_date)} à ${r.creneau_heure}</p>
        </div>

        <p style="color: #666;">
          Vous n'avez rien à faire — notre équipe s'occupe de tout. Plongez, on gère. 🌊
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />

        <p style="color: #999; font-size: 12px;">
          Besoin d'annuler ? <a href="${annulationUrl}" style="color: #1A00CC;">Cliquez ici</a>
          (25 % de frais si annulation < 24h avant l'intervention).<br />
          Des questions ? contact@ploufpiscines.fr
        </p>
      </div>
    `,
  });
}

// ── 4. Confirmation d'annulation ──────────────────────────────────────────

export async function sendCancellationConfirmation(
  r: { prenom: string; nom: string; email: string },
  frais: number
) {
  await resend.emails.send({
    from: "Plouf Piscines <contact@ploufpiscines.fr>",
    to: r.email,
    subject: "Votre réservation Plouf a été annulée",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333;">Réservation annulée</h1>
        <p>Bonjour ${r.prenom},</p>
        <p>Votre réservation Plouf Piscines a bien été annulée.</p>
        ${
          frais > 0
            ? `<p>Des frais d'annulation de <strong>${frais.toFixed(2)} €</strong> ont été prélevés
               (annulation effectuée moins de 24h avant l'intervention prévue).</p>`
            : `<p>Aucun frais n'a été prélevé — la pré-autorisation bancaire a été annulée.</p>`
        }
        <p>Si vous souhaitez réserver à nouveau, rendez-vous sur <a href="${APP_URL}/reserver" style="color: #1A00CC;">ploufpiscines.fr/reserver</a>.</p>
        <p style="color: #666;">À bientôt,<br/>L'équipe Plouf</p>
      </div>
    `,
  });
}
