import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

export const metadata = {
  title: "Tarifs entretien piscine Bordeaux. Abonnements dès 120 €/mois",
  description:
    "Tarifs transparents : abonnements piscine dès 120 €/mois sur Bordeaux Métropole et le Nord Médoc. Interventions express dès 75 €. Produits inclus, sans surprise.",
  alternates: { canonical: "https://ploufpiscines.fr/tarifs" },
};

// ─── Données ──────────────────────────────────────────────────────────────────

const ABONNEMENTS = [
  { taille: "Petite",  volume: "jusqu'à 30 m³", bimensuel: 120, hebdo: 199 },
  { taille: "Moyenne", volume: "30 à 60 m³",    bimensuel: 145, hebdo: 245, populaire: true },
  { taille: "Grande",  volume: "60 m³ et +",    bimensuel: 179, hebdo: 299 },
];

const PRESTATIONS = [
  { label: "Passage ponctuel",          desc: "Traitement eau uniquement (pH · chlore · algicide)",    tarif: "dès 75 €"  },
  { label: "Nettoyage complet",         desc: "Fond · parois · skimmers · filtration",                 tarif: "dès 150 €" },
  { label: "Remise en route printemps", desc: "Déshivernage · équilibrage · vérification filtre",      tarif: "dès 225 €" },
  { label: "Hivernage complet",         desc: "Produits · protection · mise en veille",                tarif: "dès 225 €" },
  { label: "Changement sable filtre",   desc: "Vidange + sable + remise en route",                     tarif: "250 €"     },
  { label: "Option hiver",              desc: "1 passage/mois · Nov–Avr · Clients abonnés uniquement", tarif: "79 €/mois" },
];

const EAU_VERTE = [
  { niveau: "Niveau 1", etat: "Eau verte · fond visible",        passages: "1 passage (J1)",       tarif: "dès 200 €" },
  { niveau: "Niveau 2", etat: "Eau opaque · fond non visible",   passages: "2 passages (J1 + J3)", tarif: "dès 300 €" },
  { niveau: "Niveau 3", etat: "Fond colonisé · vidange possible", passages: "3 passages (J1+J3+J5)", tarif: "dès 500 €" },
];

const COMPARATIF = [
  { critere: "Produits",            ponctuel: "En sus",              abo: "Inclus" },
  { critere: "Eau verte",           ponctuel: "dès 200 € si ça arrive", abo: "Ne se produit pas" },
  { critere: "Rapport de passage",  ponctuel: "Non",                 abo: "Inclus" },
  { critere: "Coût sur 6 mois",     ponctuel: "Imprévisible",        abo: "Fixe dès 120 €/mois" },
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
              Une fois ou tout l&apos;été.<br />
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
              Piscine au sel : +15%, renseignez-le à la réservation.
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
                <div className="px-6 py-3 text-sm font-semibold text-gray-500">Description</div>
                <div className="px-6 py-3 text-sm font-semibold text-gray-500 text-right">Tarif</div>
              </div>
              {PRESTATIONS.map((p, i) => (
                <div
                  key={p.label}
                  className={`grid grid-cols-3 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                >
                  <div className="px-6 py-4 font-medium text-gray-900 text-sm">{p.label}</div>
                  <div className="px-6 py-4 text-gray-500 text-sm">{p.desc}</div>
                  <div className="px-6 py-4 text-right font-bold text-plouf">{p.tarif}</div>
                </div>
              ))}
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-2 mb-5">
              {PRESTATIONS.map(p => (
                <div key={p.label} className="bg-white border border-gray-100 rounded-xl px-4 py-3.5">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-gray-900 text-sm">{p.label}</p>
                    <p className="font-bold text-plouf flex-shrink-0 ml-4">{p.tarif}</p>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{p.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-400 mb-8">
              Déplacement et produits inclus · Piscine au sel : +15%
            </p>

            <Link
              href="/reserver"
              className="inline-flex items-center gap-2 bg-plouf text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-plouf-dark transition-colors shadow-md shadow-plouf/20"
            >
              Réserver une intervention →
            </Link>

            {/* Eau verte */}
            <div className="mt-16">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Rattrapage eau verte</p>
              <h3 className="font-title font-bold text-2xl text-gray-900 mb-2">Piscine verte ? On la remet en ordre.</h3>
              <p className="text-gray-500 text-sm mb-6">Tarif selon l&apos;état de l&apos;eau et la taille du bassin.</p>

              <div className="hidden md:block rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-3">
                <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                  <div className="px-6 py-3 text-sm font-semibold text-gray-500">Niveau</div>
                  <div className="px-6 py-3 text-sm font-semibold text-gray-500">État de l&apos;eau</div>
                  <div className="px-6 py-3 text-sm font-semibold text-gray-500 text-right">Tarif</div>
                </div>
                {EAU_VERTE.map((e, i) => (
                  <div key={e.niveau} className={`grid grid-cols-3 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    <div className="px-6 py-4 font-medium text-gray-900 text-sm">{e.niveau}</div>
                    <div className="px-6 py-4 text-gray-500 text-sm">{e.etat}<br/><span className="text-xs text-gray-400">{e.passages}</span></div>
                    <div className="px-6 py-4 text-right font-bold text-plouf">{e.tarif}</div>
                  </div>
                ))}
              </div>

              <div className="md:hidden space-y-2 mb-3">
                {EAU_VERTE.map(e => (
                  <div key={e.niveau} className="bg-white border border-gray-100 rounded-xl px-4 py-3.5">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-gray-900 text-sm">{e.niveau} — {e.etat}</p>
                      <p className="font-bold text-plouf flex-shrink-0 ml-4">{e.tarif}</p>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">{e.passages}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">Piscine au sel : +15% · Tarif affiché pour petite piscine (&lt; 30 m³)</p>
            </div>

          </div>
        </section>

        {/* ══ BLOC 3 — PONT PONCTUEL → ABONNEMENT ══════════════════════════════ */}
        <section className="px-6 py-20 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">

            <div className="mb-10">
              <h2 className="font-title font-bold text-3xl text-gray-900 mb-2">
                Ponctuel ou abonnement ?
              </h2>
              <p className="text-gray-500 text-base max-w-xl">
                Comparez les deux formules et choisissez ce qui vous convient.
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

        {/* ══ BLOC HORS ZONE ════════════════════════════════════════════════════ */}
        <section className="px-6 py-16 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Zone d&apos;intervention</p>
            <h2 className="font-title font-bold text-2xl text-gray-900 mb-2">Bordeaux Métropole · Nord Médoc</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-xl">
              Notre zone principale couvre la Métropole bordelaise et le Nord Médoc. Vous êtes en dehors ? On intervient quand même — avec un supplément kilométrique.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 inline-flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-plouf-lavande flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-plouf" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Supplément hors zone</p>
                <p className="text-gray-500 text-sm">+1,40 € TTC / km aller-retour</p>
                <p className="text-gray-400 text-xs mt-0.5">Ex : Pauillac (~40 km A/R) = +56 € · Lesparre (~60 km A/R) = +84 €</p>
              </div>
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
