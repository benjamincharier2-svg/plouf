"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Est-ce que je dois être présent lors du passage ?",
    a: "Non. Le technicien intervient même en votre absence — il vous suffit de lui indiquer l'accès à votre jardin lors de la réservation. Vous recevez le rapport WhatsApp avec les photos dès qu'il a terminé.",
  },
  {
    q: "Que se passe-t-il si je ne suis pas satisfait du passage ?",
    a: "On revient. Gratuitement. C'est inclus dans l'abonnement — si quelque chose ne va pas dans les 48h suivant l'intervention, un technicien repassera sans supplément.",
  },
  {
    q: "Les produits de traitement sont-ils vraiment inclus ?",
    a: "Oui, dans tous les abonnements. Chlore, algicide, régulateur de pH, anti-calcaire — tout est apporté et dosé par le technicien. Rien à commander, rien à stocker.",
  },
  {
    q: "Comment fonctionne le paiement ?",
    a: "Votre carte est pré-autorisée au moment de la réservation, mais le débit n'est déclenché qu'après l'intervention. Si elle n'a pas lieu, vous n'êtes pas débité.",
  },
  {
    q: "Puis-je annuler ou reporter un passage ?",
    a: "Oui, jusqu'à 24h avant sans frais. En dessous de 24h, 25% du montant peut être retenu. Vous pouvez annuler directement depuis le lien dans votre email de confirmation.",
  },
  {
    q: "Intervenez-vous pour des piscines hors-sol ou des spas ?",
    a: "Nos formules d'abonnement sont conçues pour les piscines enterrées. Pour un spa ou une piscine hors-sol, contactez-nous directement — on étudie la demande au cas par cas.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item, i) => (
        <div
          key={i}
          className="border border-gray-100 rounded-xl overflow-hidden bg-white"
        >
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-medium text-gray-900 text-sm leading-snug">{item.q}</span>
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-plouf/20 flex items-center justify-center text-plouf transition-transform ${open === i ? "rotate-45" : ""}`}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
