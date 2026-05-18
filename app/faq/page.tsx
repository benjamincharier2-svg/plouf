"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const questions = [
  {
    q: "Vous venez vraiment sans que je sois là ?",
    a: "Oui. Un accès au portail ou au bassin et c'est bon. Vous recevez le rapport de passage après la visite avec les photos et les mesures. Pas besoin d'être présent.",
  },
  {
    q: "Que se passe-t-il si je ne suis pas content du passage ?",
    a: "Vous nous écrivez sous 48h. On repasse gratuitement ou on rembourse — au choix. Aucune discussion.",
  },
  {
    q: "Pourquoi le paiement après ?",
    a: "Parce qu'on a confiance dans notre service — et qu'on veut que vous l'ayez aussi. Stripe pré-autorise votre carte à la réservation, mais ne débite qu'après l'intervention.",
  },
  {
    q: "Combien de temps dure un passage ?",
    a: "30 à 60 min selon la taille du bassin et l'état de l'eau. Vous êtes prévenu par notification à l'arrivée et au départ.",
  },
  {
    q: "Mon eau est trouble, c'est grave ?",
    a: "Non, ça se rattrape vite. Mentionnez-le à la réservation, on prévoit le produit nécessaire. Si vous n'êtes pas sûr, écrivez-nous une photo — on évalue gratuitement.",
  },
  {
    q: "Vous intervenez hors saison ?",
    a: "En avril pour la remise en route et en novembre pour l'hivernage, sur demande. De décembre à mars, l'équipe est en pause.",
  },
  {
    q: "Et si mon technicien attitré est malade ?",
    a: "Un binôme prend le relais — vous êtes prévenu(e) par SMS. Le rapport reste identique, la qualité aussi.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Hero */}
          <div className="mb-12">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Page /FAQ</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-title">
              Les questions{" "}
              <span className="underline decoration-wavy decoration-plouf underline-offset-4">
                qu&apos;on nous pose vraiment.
              </span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              Pas de blabla rassurant. Les vraies questions, avec les vraies réponses.
              Si la vôtre n&apos;y est pas, écrivez-nous, on l&apos;ajoute.
            </p>
          </div>

          {/* Accordéon */}
          <div className="space-y-3 mb-14">
            {questions.map((item, i) => (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all ${
                  open === i ? "border-plouf/30 shadow-sm" : "border-plouf-glacier"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-plouf-glacier/10 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm leading-snug">{item.q}</span>
                  <span className="text-plouf font-bold text-lg flex-shrink-0 mt-0.5">
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                {open === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-plouf-glacier pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA contact */}
          <div className="bg-plouf-lavande border border-plouf/20 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-bold text-gray-900 text-xl mb-1 font-title">Pas trouvé votre réponse ?</h2>
              <p className="text-gray-500 text-sm">On répond sous 2h, même le week-end.</p>
            </div>
            <div className="flex gap-3">
              <a
                href="tel:0554540880"
                className="flex items-center gap-2 border-2 border-gray-900 text-gray-900 font-semibold px-5 py-3 rounded-xl hover:bg-gray-900 hover:text-white transition-colors text-sm"
              >
                📞 05 54 54 08 80
              </a>
              <a
                href="mailto:contact@ploufpiscines.fr"
                className="flex items-center gap-2 bg-plouf text-white font-semibold px-5 py-3 rounded-xl hover:bg-plouf-dark transition-colors text-sm"
              >
                ✉ Email
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
