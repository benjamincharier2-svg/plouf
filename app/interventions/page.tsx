import React from "react";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
  title: "Interventions piscine à Bordeaux. Hivernage, remise en route, dépannage",
  description:
    "Hivernage, remise en route printemps, changement de sable, traitement eau verte à Bordeaux, Médoc et Arcachon. Tarifs fixes, technicien qualifié.",
  alternates: { canonical: "https://ploufpiscines.fr/interventions" },
};

const interventions = [
  { label: "Passage ponctuel",          desc: "Traitement eau uniquement (pH · chlore · algicide)", tarif: "dès 75 €"  },
  { label: "Nettoyage complet",         desc: "Fond · parois · skimmers · filtration",              tarif: "dès 150 €" },
  { label: "Remise en route printemps", desc: "Déshivernage · équilibrage · vérification filtre",   tarif: "dès 225 €" },
  { label: "Hivernage complet",         desc: "Produits · protection · mise en veille",              tarif: "dès 225 €" },
  { label: "Changement sable filtre",   desc: "Vidange + sable + remise en route",                   tarif: "250 €"     },
  { label: "Traitement eau verte",      desc: "Choc, nettoyage, re-passage J+3 (selon niveau)",     tarif: "dès 200 €" },
];

export default function InterventionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Interventions ponctuelles</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight font-title">
            Un passage unique.{" "}
            <span className="underline decoration-wavy decoration-plouf underline-offset-4">Sans abonnement.</span>
          </h1>
          <p className="text-gray-600 text-lg mb-12 max-w-xl leading-relaxed">
            Vous avez besoin d&apos;une intervention précise, pas d&apos;un contrat
            pour toute la saison. C&apos;est possible. Les tarifs sont fixes et
            annoncés <strong>avant</strong> le passage.
          </p>

          {/* Table */}
          <div className="border border-plouf-glacier rounded-2xl overflow-hidden mb-5 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-plouf-glacier/30 border-b border-plouf-glacier">
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Prestation</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Ce que ça couvre</th>
                  <th className="px-5 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Tarif</th>
                  <th className="px-5 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Durée</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {interventions.map((item, i) => (
                  <tr key={item.label} className={`border-b border-plouf-glacier/40 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-plouf-glacier/10"}`}>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-gray-900 text-sm">{item.label}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-sm hidden md:table-cell">{item.desc}</td>
                    <td className="px-5 py-4 text-right font-bold text-plouf text-sm whitespace-nowrap">{item.tarif}</td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href="/reserver"
                        className="text-xs border border-plouf-glacier text-gray-600 px-3 py-1.5 rounded-full hover:border-plouf hover:text-plouf transition-colors whitespace-nowrap"
                      >
                        Réserver →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 italic mb-12 text-center">Tous les tarifs incluent le déplacement et les produits.</p>

          {/* 3 garanties */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>), titre: "Paiement après", desc: "Pas de pré-paiement. Le débit Stripe se fait après l'intervention." },
              { icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>), titre: "Rapport de passage", desc: "Photos + mesures envoyés juste après. Même pour un passage unique." },
              { icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>), titre: "Essayez une fois. Si vous restez, on déduit.", desc: "Faites une intervention express. Si vous prenez l'abonnement ensuite, son montant est intégralement déduit." },
            ].map(item => (
              <div key={item.titre} className="bg-plouf-glacier/20 rounded-2xl p-5 border border-plouf-glacier">
                <div className="w-10 h-10 rounded-xl bg-plouf-lavande text-plouf flex items-center justify-center mb-3">{item.icon}</div>
                <div className="font-semibold text-gray-900 text-sm mb-2">{item.titre}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Devis CTA */}
          <div className="bg-plouf-lavande border border-plouf/20 rounded-2xl p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-bold text-gray-900 text-xl mb-1 font-title">Un cas pas dans la liste ?</h2>
              <p className="text-gray-500 text-sm">Décrivez-nous, on revient avec un devis fixe sous 24h.</p>
            </div>
            <Link
              href="mailto:contact@ploufpiscines.fr"
              className="bg-plouf text-white font-bold px-7 py-4 rounded-xl hover:bg-plouf-dark transition-colors whitespace-nowrap"
            >
              Demander un devis →
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
