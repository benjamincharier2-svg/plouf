"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Combien de temps filtrer par jour ?",
    a: "La règle de base : température de l'eau ÷ 2 = heures de filtration. À 28°C, comptez 14h. En dessous de 15°C, 4–6h suffisent. En cas de traitement choc ou de forte utilisation, passez en 24h/24 pendant 24 à 48h. Fractionnez en deux plages horaires : tôt le matin et en soirée.",
  },
  {
    q: "Mon eau est trouble mais pas verte — c'est grave ?",
    a: "C'est le signe précurseur. L'eau trouble (blanc laiteux ou légèrement grisée) indique généralement un pH déréglé, un taux de chlore insuffisant ou un filtre colmaté. Testez les paramètres immédiatement et contre-lavez le filtre. Si rien ne s'améliore en 24h, un traitement choc s'impose. L'eau verte suit souvent une eau trouble non traitée.",
  },
  {
    q: "Peut-on se baigner juste après un traitement ?",
    a: "Après un traitement d'entretien classique (ajout de pH+ ou pH-, chlore régulier), attendez au minimum 4h. Après un traitement choc, comptez 12 à 24h et vérifiez que le taux de chlore libre est redescendu en dessous de 3 mg/L avant de vous baigner. La filtration doit tourner pendant tout ce délai.",
  },
  {
    q: "Quelle différence entre un passage bimensuel et hebdomadaire ?",
    a: "Le bimensuel (2×/mois) convient aux piscines peu utilisées ou en périodes moins chaudes. L'hebdomadaire (4×/mois) est recommandé pour les fortes utilisations, les piscines exposées (beaucoup de soleil, feuilles), ou les bassins au sel dont le pH monte vite. En juillet-août, la plupart de nos clients en hebdomadaire ne rencontrent aucun problème — ceux en bimensuel ont parfois besoin d'un passage correctif.",
  },
  {
    q: "Le robot de fond remplace-t-il l'entretien chimique ?",
    a: "Non. Le robot nettoie les surfaces (fond, parois) mais ne traite pas l'eau. Un bassin impeccable visuellement peut avoir un pH déréglé ou un chlore insuffisant — et inversement. Les deux sont complémentaires. Les techniciens Plouf apportent leur propre matériel de nettoyage lors de chaque passage.",
  },
  {
    q: "Mon eau est dure (calcaire élevé) — quel impact ?",
    a: "Un TH (titre hydrotimétrique) trop élevé entartre les équipements, dépose du calcaire sur les parois et réduit l'efficacité du chlore. Un TH trop bas rend l'eau agressive pour les matériaux. L'idéal est entre 15 et 25°f. On corrige avec un séquestrant calcaire ou un anti-tartre selon le sens. C'est un paramètre souvent négligé mais important sur la durée.",
  },
];

export default function ConseilsFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {ITEMS.map((item, i) => (
        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-medium text-gray-900 text-sm leading-snug">{item.q}</span>
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-plouf/20 flex items-center justify-center text-plouf transition-transform duration-200 ${open === i ? "rotate-45 bg-plouf/5" : ""}`}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-5 border-t border-gray-50">
              <p className="text-gray-500 text-sm leading-relaxed pt-4">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
