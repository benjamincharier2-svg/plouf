import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

export const metadata = {
  title: "Tarifs entretien piscine Bordeaux — Abonnements dès 120 €/mois",
  description:
    "Tarifs transparents : abonnements piscine dès 120 €/mois sur Bordeaux Métropole, Médoc et Arcachon. Interventions express dès 75 €. Produits inclus, sans surprise.",
  alternates: { canonical: "https://ploufpiscines.fr/tarifs" },
};

// ─── Données ──────────────────────────────────────────────────────────────────

const ABONNEMENTS = [
  { taille: "Petite",  volume: "jusqu'à 30 m³", bimensuel: 120, hebdo: 199 },
  { taille: "Moyenne", volume: "30 à 60 m³",    bimensuel: 145, hebdo: 245, populaire: true },
  { taille: "Grande",  volume: "60 m³ et +",    bimensuel: 179, hebdo: 299 },
];

const PRESTATIONS = [
  { label: "Passage ponctuel",        tarif: "dès 75 €",  duree: "~1h"     },
  { label: "Nettoyage complet",       tarif: "120 €",     duree: "~2h"     },
  { label: "Remise en route printemps", tarif: "250 €",   duree: "~3h"     },
  { label: "Hivernage complet",       tarif: "290 €",     duree: "~2h"     },
  { label: "Changement sable filtre", tarif: "220 €",     duree: "~2h"     },
  { label: "Eau verte",               tarif: "dès 150 €", duree: "2 visites" },
];

const COMPARATIF = [
  { critere: "Produits",            ponctuel: "En sus",             abo: "Inclus" },
  { critere: "Eau verte",           ponctuel: "150 €+ si ça arrive", abo: "Ne se produit pas" },
  { critere: "Rapport de passage",  ponctuel: "Non",                abo: "Inclus" },
  { critere: "Coût sur 6 mois",     ponctuel: "Imprévisible",       abo: "Fixe dès 120 €/mois" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-white">

      <Header />

      <main className="pt-24">

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <section className="relative px-6 py-28 text-center overflow-hidden">
          {/* Photo de fond */}
          <Image
            src="/hero.jpg"
            alt="Piscine Plouf"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay dégradé */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(19,19,214,0.75) 0%, rgba(14,14,180,0.60) 50%, rgba(0,100,140,0.65) 100%)" }}
          />
          {/* Contenu */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-5">Tarifs</p>
            <h1 className="font-title font-bold text-4xl md:text-5xl text-white leading-tight mb-5">
              Une fois ou tout l&apos;été —<br />
              <span className="text-plouf-eau">la piscine parfaite dans les deux cas.</span>
            </h1>
            <p className="text-white/80 text-lg mb-10">
              Deux options. Choisissez ce qui vous correspond.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#abonnement"
                className="inline-flex items-center justify-center gap-2 bg-white text-plouf px-6 py-3 rounded-lg text-sm font-semibold hover:bg-plouf-lavande transition-colors shadow-lg"
              >
                Voir les abonnements ↓
              </a>
              <a
                href="#ponctuel"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:border-white hover:bg-white/10 transition-colors"
              >
                Voir les interventions ↓
              </a>
            </div>
          </div>
        </section>

        {/* ══ BLOC 1 — ABONNEMENT ═══════════════════════════════════════════════ */}
        <section id="abonnement" className="px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto">

            {/* Titre */}
            <div className="mb-10">
              <p className="text-xs font-semibold text-plouf/60 uppercase tracking-widest mb-3">Abonnement saisonnier</p>
              <h2 className="font-title font-bold text-3xl text-gray-900 mb-2">
                Votre piscine impeccable de mai à octobre.
              </h2>
              <p className="text-gray-500 text-base">
                Choisissez votre formule une fois. On s&apos;occupe de tout le reste.
              </p>
            </div>

            {/* Grille 3 × 2 — desktop */}
            <div className="hidden md:block rounded-2xl overflow-hidden border border-gray-200 mb-5 shadow-sm">
              {/* En-têtes tailles */}
              <div className="grid grid-cols-4 border-b border-gray-100"
                style={{ background: "linear-gradient(90deg, #1313D6, #2525e0)" }}>
                <div className="px-5 py-4" />
                {ABONNEMENTS.map(a => (
                  <div key={a.taille} className="px-5 py-4 text-center relative">
                      <p className="font-bold text-white text-sm">{a.taille}</p>
                    <p className="text-white/60 text-xs mt-0.5">{a.volume}</p>
                    {a.populaire && (
                      <span className="inline-block mt-1.5 bg-yellow-300 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        La plus choisie
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {/* Ligne 2×/mois */}
              <div className="grid grid-cols-4 border-b border-gray-100 bg-white">
                <div className="px-5 py-4">
                  <p className="font-semibold text-gray-700 text-sm">2×/mois</p>
                  <p className="text-gray-400 text-xs">Bimensuel</p>
                </div>
                {ABONNEMENTS.map(a => (
                  <div key={a.taille} className={`px-5 py-4 text-center ${a.populaire ? "bg-plouf-lavande/30" : ""}`}>
                    <p className="font-bold text-gray-900 text-lg">{a.bimensuel} €</p>
                    <p className="text-gray-400 text-xs">/ mois</p>
                  </div>
                ))}
              </div>
              {/* Ligne 4×/mois */}
              <div className="grid grid-cols-4 bg-gray-50/40">
                <div className="px-5 py-4">
                  <p className="font-semibold text-gray-700 text-sm">4×/mois</p>
                  <p className="text-gray-400 text-xs">Hebdomadaire</p>
                </div>
                {ABONNEMENTS.map(a => (
                  <div key={a.taille} className={`px-5 py-4 text-center ${a.populaire ? "bg-plouf-lavande/30" : ""}`}>
                    <p className={`font-bold text-lg ${a.populaire ? "text-plouf" : "text-gray-900"}`}>{a.hebdo} €</p>
                    <p className="text-gray-400 text-xs">/ mois</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile — cartes empilées */}
            <div className="md:hidden space-y-3 mb-5">
              {ABONNEMENTS.map(a => (
                <div key={a.taille} className={`rounded-2xl border-2 p-5 ${a.populaire ? "border-plouf" : "border-gray-100"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{a.taille}</p>
                      <p className="text-xs text-gray-400">{a.volume}</p>
                    </div>
                    {a.populaire && (
                      <span className="bg-plouf text-white text-xs font-bold px-2 py-1 rounded-full">La plus choisie</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-400 mb-1">2×/mois</p>
                      <p className="font-bold text-gray-900">{a.bimensuel} €<span className="text-xs font-normal text-gray-400">/mois</span></p>
                    </div>
                    <div className={`rounded-xl p-3 text-center ${a.populaire ? "bg-plouf-lavande/40" : "bg-gray-50"}`}>
                      <p className="text-xs text-gray-400 mb-1">4×/mois</p>
                      <p className={`font-bold ${a.populaire ? "text-plouf" : "text-gray-900"}`}>{a.hebdo} €<span className="text-xs font-normal text-gray-400">/mois</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-400 italic mb-8">
              Piscine au sel : +15% — renseignez-le à la réservation.
            </p>

            {/* Inclus */}
            <div className="bg-plouf-lavande/20 border border-plouf/10 rounded-2xl px-6 py-5 mb-8">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Inclus dans toutes les formules</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  "Produits",
                  "Rapport de passage + photos",
                  "Alertes anomalie",
                  "Intervenant dédié",
                  "Correction incluse si dérive",
                ].map(item => (
                  <span key={item} className="flex items-center gap-1.5 text-sm text-gray-700">
                    <span className="text-plouf font-bold">✓</span> {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/reserver"
                className="inline-flex items-center gap-2 bg-plouf text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-plouf-dark transition-colors shadow-md shadow-plouf/20"
              >
                Choisir mon abonnement →
              </Link>
              <p className="text-xs text-gray-400">Produits inclus · Paiement mensuel · Annulation 15 jours avant</p>
            </div>

          </div>
        </section>

        {/* ══ BLOC 2 — INTERVENTIONS PONCTUELLES ════════════════════════════════ */}
        <section
          id="ponctuel"
          className="px-6 py-20 border-t border-gray-100"
          style={{ background: "linear-gradient(160deg, #f5f7ff 0%, #edf9fb 100%)" }}
        >
          <div className="max-w-4xl mx-auto">

            <div className="mb-10">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Intervention unique</p>
              <h2 className="font-title font-bold text-3xl text-gray-900 mb-2">
                Besoin d&apos;un passage unique ?
              </h2>
              <p className="text-gray-500 text-base">
                Pas de contrat. Tarif fixe annoncé avant l&apos;intervention. Vous payez après.
              </p>
            </div>

            {/* Table desktop */}
            <div className="hidden md:block rounded-2xl overflow-hidden border border-gray-200 mb-5 shadow-sm">
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                <div className="px-6 py-3 text-sm font-semibold text-gray-500">Prestation</div>
                <div className="px-6 py-3 text-sm font-semibold text-gray-500 text-right">Tarif</div>
                <div className="px-6 py-3 text-sm font-semibold text-gray-500 text-right">Durée</div>
              </div>
              {PRESTATIONS.map((p, i) => (
                <div
                  key={p.label}
                  className={`grid grid-cols-3 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                >
                  <div className="px-6 py-4 font-medium text-gray-900 text-sm">{p.label}</div>
                  <div className="px-6 py-4 text-right font-bold text-plouf">{p.tarif}</div>
                  <div className="px-6 py-4 text-right text-gray-400 text-sm">{p.duree}</div>
                </div>
              ))}
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-2 mb-5">
              {PRESTATIONS.map(p => (
                <div key={p.label} className="flex justify-between items-center bg-white border border-gray-100 rounded-xl px-4 py-3.5">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{p.label}</p>
                    <p className="text-gray-400 text-xs">{p.duree}</p>
                  </div>
                  <p className="font-bold text-plouf flex-shrink-0 ml-4">{p.tarif}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-400 mb-8">
              Déplacement et produits inclus dans tous les tarifs.
            </p>

            <Link
              href="/reserver"
              className="inline-flex items-center gap-2 bg-plouf text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-plouf-dark transition-colors shadow-md shadow-plouf/20"
            >
              Réserver une intervention →
            </Link>

          </div>
        </section>

        {/* ══ BLOC 3 — PONT PONCTUEL → ABONNEMENT ══════════════════════════════ */}
        <section className="px-6 py-20 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">

            <div className="mb-10">
              <h2 className="font-title font-bold text-3xl text-gray-900 mb-2">
                Votre intervention déduite du premier mois.
              </h2>
              <p className="text-gray-500 text-base max-w-xl">
                Vous testez aujourd&apos;hui. Vous basculez sur l&apos;abonnement dans le mois.
                Le montant est déduit automatiquement. Zéro risque.
              </p>
            </div>

            {/* Comparatif */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-10">
              <div className="grid grid-cols-3 border-b border-gray-100">
                <div className="px-5 py-3.5 bg-gray-50" />
                <div className="px-5 py-3.5 bg-gray-50 border-l border-gray-100 text-center">
                  <p className="text-sm font-semibold text-gray-500">Ponctuel</p>
                </div>
                <div className="px-5 py-3.5 border-l border-gray-100 text-center"
                  style={{ background: "linear-gradient(90deg, #E7EBFF, #D6F2F7)" }}>
                  <p className="text-sm font-semibold text-plouf">Abonnement</p>
                </div>
              </div>
              {COMPARATIF.map((row, i) => (
                <div
                  key={row.critere}
                  className={`grid grid-cols-3 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                >
                  <div className="px-5 py-4 text-sm font-medium text-gray-700">{row.critere}</div>
                  <div className="px-5 py-4 text-sm text-gray-400 border-l border-gray-100 text-center">{row.ponctuel}</div>
                  <div className="px-5 py-4 text-sm font-semibold text-plouf border-l border-gray-100 text-center">{row.abo}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center gap-2 bg-plouf text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-plouf-dark transition-colors shadow-md shadow-plouf/20"
              >
                Choisir mon abonnement →
              </Link>
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-7 py-3.5 rounded-xl text-sm font-semibold hover:border-plouf hover:text-plouf transition-colors"
              >
                Réserver d&apos;abord →
              </Link>
            </div>

          </div>
        </section>

        {/* ══ BLOC 4 — CAS PARTICULIER ══════════════════════════════════════════ */}
        <section
          className="px-6 py-16 border-t border-gray-100"
          style={{ background: "linear-gradient(135deg, #E7EBFF 0%, #D6F2F7 100%)" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-title font-bold text-xl text-gray-900 mb-2">
              Votre situation ne rentre pas dans une case ?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              On revient avec un devis fixe sous 24h.
            </p>
            <a
              href="mailto:contact@ploufpiscines.fr"
              className="inline-flex items-center gap-2 bg-white text-plouf font-semibold px-6 py-3 rounded-xl hover:bg-plouf hover:text-white transition-colors shadow-sm border border-plouf/15 text-sm"
            >
              contact@ploufpiscines.fr
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
