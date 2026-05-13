import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Interventions ponctuelles — Plouf Piscines",
  description:
    "Remise en route, hivernage, traitement choc, dépannage. Tarifs transparents, intervention sous 48h.",
};

const interventions = [
  {
    titre: "Remise en route de saison",
    description:
      "Réouverture complète après hivernage : nettoyage, vérification du système de filtration, rééquilibrage de l'eau, mise en route.",
    prix: "À partir de 149 €",
    duree: "2h environ",
    emoji: "🌱",
  },
  {
    titre: "Hivernage",
    description:
      "Préparation pour l'hiver : traitement de conservation, abaissement du niveau d'eau, protection du système de filtration.",
    prix: "À partir de 129 €",
    duree: "1h30 environ",
    emoji: "❄️",
  },
  {
    titre: "Traitement choc (eau verte / trouble)",
    description:
      "Traitement intensif pour eau verte ou fortement trouble. Choc chlore + algicide. Résultat visible en 24–48h.",
    prix: "À partir de 179 €",
    duree: "1h + suivi",
    emoji: "🧪",
  },
  {
    titre: "Analyse et rééquilibrage de l'eau",
    description:
      "Mesure complète des paramètres (pH, TAC, dureté, chlore) et correction pour retrouver une eau parfaitement équilibrée.",
    prix: "À partir de 89 €",
    duree: "45 min",
    emoji: "🔬",
  },
  {
    titre: "Nettoyage fond et parois",
    description:
      "Aspiration manuelle du fond, brossage des parois, écumage de surface. Votre piscine comme neuve.",
    prix: "À partir de 99 €",
    duree: "1h à 1h30",
    emoji: "🧹",
  },
  {
    titre: "Dépannage filtration / pompe",
    description:
      "Diagnostic et intervention sur votre système de filtration : pompe, filtre à sable, skimmers, bonde de fond.",
    prix: "Sur devis",
    duree: "Selon panne",
    emoji: "🔧",
  },
];

export default function InterventionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo-bleu.png"
              alt="plouf!"
              width={90}
              height={40}
              className="object-contain"
            />
          </Link>
          <Link
            href="/reserver"
            className="bg-[#1A00CC] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#1200A0] transition-colors"
          >
            Réserver un abonnement
          </Link>
        </div>
      </header>

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#EEE9FF] text-[#1A00CC] text-sm font-medium px-4 py-2 rounded-full mb-6">
              Intervention sous 48h
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Interventions<br />
              <span className="text-[#1A00CC]">ponctuelles</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Besoin d'une intervention unique ? Remise en route, hivernage, traitement
              choc ou dépannage — nos techniciens interviennent sous 48h sur
              Bordeaux Métropole et le Médoc-Bassin.
            </p>
          </div>

          {/* Grille interventions */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {interventions.map((item) => (
              <div
                key={item.titre}
                className="border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-[#1A00CC]/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{item.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {item.titre}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1A00CC] text-lg">
                        {item.prix}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                        ⏱ {item.duree}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Zone d'intervention */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Zone d'intervention
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="font-semibold text-gray-800 mb-2">
                  🏙 Bordeaux Métropole
                </div>
                <p className="text-gray-600 text-sm">
                  Bordeaux, Mérignac, Pessac, Talence, Gradignan, Villenave-d'Ornon,
                  Bègles, Floirac, Cenon, Lormont, Bassens, Carbon-Blanc,
                  Ambès et communes limitrophes.
                </p>
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-2">
                  🌊 Médoc — Bassin d'Arcachon
                </div>
                <p className="text-gray-600 text-sm">
                  Arcachon, La Teste-de-Buch, Gujan-Mestras, Le Teich,
                  Lège-Cap-Ferret, Andernos-les-Bains, Lacanau et alentours.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#1A00CC] rounded-2xl p-10 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Vous préférez un entretien régulier ?
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Avec notre abonnement saison, on prend tout en charge de mai à
              octobre. Zéro souci, eau cristalline garantie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reserver"
                className="bg-white text-[#1A00CC] font-bold px-8 py-4 rounded-full hover:bg-[#EEE9FF] transition-colors"
              >
                Voir les abonnements →
              </Link>
              <Link
                href="mailto:contact@ploufpiscines.fr"
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
              >
                Demander un devis
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Image
            src="/logo-bleu.png"
            alt="plouf!"
            width={70}
            height={32}
            className="object-contain"
          />
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">Accueil</Link>
            <Link href="/reserver" className="hover:text-gray-900">Réserver</Link>
            <Link href="/eau-verte" className="hover:text-gray-900">Eau verte</Link>
            <Link href="/mentions-legales" className="hover:text-gray-900">Mentions légales</Link>
          </div>
          <p className="text-xs text-gray-400">contact@ploufpiscines.fr</p>
        </div>
      </footer>
    </div>
  );
}
