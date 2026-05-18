import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Interventions piscine à Bordeaux — Hivernage, remise en route, dépannage",
  description:
    "Hivernage, remise en route printemps, changement de sable, traitement eau verte à Bordeaux, Médoc et Arcachon. Tarifs fixes, technicien qualifié.",
  alternates: { canonical: "https://ploufpiscines.fr/interventions" },
};

const interventions = [
  { label: "Passage ponctuel", desc: "Traitement eau + nettoyage bassin", tarif: "dès 75€", duree: "~1h" },
  { label: "Nettoyage complet", desc: "Fond, parois, skimmers, filtration", tarif: "120€", duree: "~2h" },
  { label: "Remise en route printemps", desc: "Déshivernage, équilibrage, vérif filtre", tarif: "250€", duree: "~3h" },
  { label: "Hivernage complet", desc: "Produits hivernage, protection, mise en veille", tarif: "290€", duree: "~2h" },
  { label: "Changement sable filtre", desc: "Vidange + sable + remise en route", tarif: "220€", duree: "~2h" },
  { label: "Traitement eau verte", desc: "Choc, nettoyage, re-passage J+3", tarif: "dès 150€", duree: "2 visites" },
];

export default function InterventionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Image src="/logo-bleu.png" alt="plouf!" width={80} height={36} className="object-contain" />
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <Link href="/tarifs" className="hover:text-plouf transition-colors">Tarifs</Link>

              <Link href="/conseils" className="hover:text-plouf transition-colors">Nos conseils</Link>
              <Link href="/a-propos" className="hover:text-plouf transition-colors">À propos</Link>
            </nav>
          </div>
          <Link href="/reserver" className="bg-plouf text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-plouf-dark transition-colors">
            Réserver →
          </Link>
        </div>
      </header>

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Interventions ponctuelles</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight font-title">
            Un passage unique.{" "}
            <span className="underline decoration-wavy decoration-plouf underline-offset-4">Sans abonnement.</span>
          </h1>
          <p className="text-gray-600 text-lg mb-12 max-w-xl leading-relaxed">
            Vous avez besoin d&apos;une intervention précise — pas d&apos;un contrat
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
                    <td className="px-5 py-4 text-right text-gray-400 text-xs whitespace-nowrap hidden md:table-cell">{item.duree}</td>
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
              { icon: "💳", titre: "Paiement après", desc: "Pas de pré-paiement. Le débit Stripe se fait après l'intervention." },
              { icon: "🔔", titre: "Rapport de passage", desc: "Photos + mesures envoyés juste après. Même pour un passage unique." },
              { icon: "🛒", titre: "Bon d'achat saisonnier", desc: "Si vous basculez sur l'abonnement plus tard, cette intervention est déduite." },
            ].map(item => (
              <div key={item.titre} className="bg-plouf-glacier/20 rounded-2xl p-5 border border-plouf-glacier">
                <div className="text-2xl mb-3">{item.icon}</div>
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
