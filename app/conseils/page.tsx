import Image from "next/image";
import Link from "next/link";
import ConseilsFaq from "@/components/ConseilsFaq";
import Header from "@/components/Header";

export const metadata = {
  title: "Conseils d'entretien piscine. Plouf Piscines",
  description: "Guide complet pour entretenir sa piscine : pH, chlore, filtration, calendrier de la saison, erreurs fréquentes, chlore vs sel. Par les techniciens Plouf.",
};

// ─── Données ──────────────────────────────────────────────────────────────────

const CALENDRIER = [
  {
    mois: "Avril",
    tag: "Remise en route",
    tagColor: "bg-emerald-100 text-emerald-700",
    actions: [
      "Retirer la bâche d'hivernage et la nettoyer avant de la ranger",
      "Remettre en route la filtration et vérifier l'étanchéité des raccords",
      "Faire une analyse complète : pH, TAC, TH, chlore",
      "Réaliser un traitement choc si l'eau a viré pendant l'hiver",
      "Nettoyer le filtre à sable ou remplacer les cartouches",
    ],
  },
  {
    mois: "Mai – Juin",
    tag: "Montée en température",
    tagColor: "bg-yellow-100 text-yellow-700",
    actions: [
      "Filtrer au minimum 8h/jour, augmenter si la température dépasse 25°C",
      "Vérifier le pH deux fois par semaine (idéal : 7,2 – 7,6)",
      "Ajouter un algicide de début de saison",
      "Nettoyer les skimmers et paniers de filtration chaque semaine",
      "Brosser les parois si des traces d'algues apparaissent",
    ],
  },
  {
    mois: "Juillet – Août",
    tag: "Pic d'utilisation",
    tagColor: "bg-orange-100 text-orange-700",
    actions: [
      "Filtration : appliquer la règle T°C ÷ 2 = heures de filtration/jour",
      "Vérifier le chlore libre après chaque forte utilisation ou orage",
      "Contre-laver le filtre dès que la pression monte de 0,3 bar",
      "Choc chlore hebdomadaire si baignades intenses ou chaleur ≥ 30°C",
      "Ne jamais ajouter deux produits différents simultanément",
    ],
  },
  {
    mois: "Septembre – Octobre",
    tag: "Fermeture",
    tagColor: "bg-blue-100 text-blue-700",
    actions: [
      "Réduire progressivement la filtration à 4–6h/jour",
      "Réaliser une dernière analyse et corriger les paramètres",
      "Traitement hivernage : algicide longue durée + produit floculant",
      "Baisser le niveau d'eau de 10 cm sous les buses de refoulement",
      "Poser la bâche d'hivernage propre et bien tendue",
    ],
  },
];

const ERREURS = [
  {
    probleme: "Eau verte",
    cause: "Prolifération d'algues due à un taux de chlore insuffisant ou une filtration trop courte, souvent après un orage ou une période chaude sans surveillance.",
    solution: "Traitement choc (hyperchlorination), brossage des parois, filtration 24h/24, puis floculation. Compter 2 passages espacés de 3 jours.",
    gravite: "Urgent",
    graviteColor: "bg-red-100 text-red-700",
    icon: "🟢",
  },
  {
    probleme: "pH trop bas (< 7,0)",
    cause: "Excès de produits acides, forte pluie ou transpiration des baigneurs. L'eau devient corrosive, elle attaque les joints, le liner et les yeux.",
    solution: "Ajouter du pH+. Corriger toujours le pH avant d'ajuster le chlore, sinon le traitement ne sert à rien.",
    gravite: "À corriger vite",
    graviteColor: "bg-orange-100 text-orange-700",
    icon: "⬇️",
  },
  {
    probleme: "pH trop haut (> 7,8)",
    cause: "Excès de produits alcalins, évaporation intense en été. Le chlore perd jusqu'à 80% de son efficacité au-dessus de 7,8.",
    solution: "Ajouter du pH-. Vérifier le TAC, un TAC trop élevé empêche le pH de descendre durablement.",
    gravite: "À corriger vite",
    graviteColor: "bg-orange-100 text-orange-700",
    icon: "⬆️",
  },
  {
    probleme: "Filtre colmaté",
    cause: "Le filtre n'a pas été contre-lavé assez régulièrement. Résultat : l'eau tourne en circuit court et n'est plus filtrée correctement.",
    solution: "Contre-lavage jusqu'à ce que l'eau de rinçage soit claire (5–7 min). Si la pression reste haute après, le sable est à changer.",
    gravite: "Surveillance",
    graviteColor: "bg-yellow-100 text-yellow-700",
    icon: "🔴",
  },
  {
    probleme: "Choc chlore raté",
    cause: "Produit ajouté en plein soleil (le chlore se dégrade en 2h sous UV), pH non corrigé avant, ou dosage insuffisant par rapport au volume.",
    solution: "Toujours traiter le soir, pH entre 7,0 et 7,4, ne pas se baigner dans les 12h. Utiliser du chlore choc sans stabilisant si l'eau est déjà stabilisée.",
    gravite: "À anticiper",
    graviteColor: "bg-blue-100 text-blue-700",
    icon: "⚡",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConseilsPage() {
  return (
    <div className="min-h-screen bg-white">

      <Header />

      <main className="pt-24">

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <section className="relative px-6 py-28 overflow-hidden">
          <Image
            src="/technicien-action.jpg"
            alt="Technicien Plouf au travail"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(19,19,214,0.80) 0%, rgba(14,14,180,0.65) 50%, rgba(0,80,120,0.70) 100%)" }}
          />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-5">Guide d&apos;entretien</p>
            <h1 className="font-title font-bold text-4xl md:text-5xl text-white leading-tight mb-5">
              Entretenir sa piscine : tout ce qu&apos;il faut savoir.{" "}
              <span className="text-plouf-eau">Et pourquoi la plupart abandonnent.</span>
            </h1>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              Guide pratique rédigé par les techniciens Plouf. Ce qu&apos;ils voient chaque semaine sur le terrain.
            </p>
          </div>
        </section>

        {/* ══ SECTION 1 — LES BASES ═════════════════════════════════════════════ */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto">

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Les fondamentaux</p>
            <h2 className="font-title font-bold text-3xl text-gray-900 mb-3">
              Comprendre l&apos;eau de sa piscine
            </h2>
            <p className="text-gray-500 text-base mb-12 max-w-xl">
              Trois paramètres gouvernent tout. Si l&apos;un déraille, les deux autres ne servent à rien.
            </p>

            <div className="space-y-8">

              {/* pH */}
              <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div>
                  <div className="text-4xl font-title font-black text-plouf mb-1">pH</div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Idéal : 7,2 – 7,6</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">L&apos;équilibre de tout le reste</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    Le pH mesure l&apos;acidité de l&apos;eau. En dessous de 7,0, l&apos;eau attaque les équipements et irrite la peau et les yeux. Au-dessus de 7,8, le chlore perd jusqu&apos;à 80% de son efficacité. Vous pouvez ajouter autant de produit que vous voulez, ça ne servira à rien.
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Le pH varie naturellement avec la température, la pluie, la transpiration des baigneurs et l&apos;évaporation. Il faut le tester <strong className="text-gray-700">au minimum deux fois par semaine</strong> en saison.
                  </p>
                </div>
              </div>

              {/* Chlore */}
              <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div>
                  <div className="text-3xl font-title font-black text-plouf mb-1">Cl₂</div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Idéal : 0,5 – 1,5 mg/L</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Chlore libre vs chlore combiné</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    Le <strong className="text-gray-700">chlore libre</strong> est actif, il détruit les bactéries et les algues. Le <strong className="text-gray-700">chlore combiné</strong> (chloramines) est déjà "usé" et ne désinfecte plus rien. C&apos;est lui qui provoque l&apos;odeur de chlore forte et les yeux rouges. Paradoxalement, une piscine qui sent trop le chlore manque souvent de chlore libre.
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Si le chlore combiné dépasse 0,6 mg/L, il faut réaliser un <strong className="text-gray-700">traitement choc</strong> pour le casser.
                  </p>
                </div>
              </div>

              {/* Filtration */}
              <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div>
                  <div className="text-3xl font-title font-black text-plouf mb-1">T°÷2</div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Heures/jour</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">La règle simple de la filtration</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    Divisez la température de l&apos;eau par 2 : c&apos;est le nombre d&apos;heures minimum de filtration par jour. 28°C → 14h. Cette règle vaut pour une utilisation normale. Lors d&apos;une forte utilisation ou d&apos;un traitement choc, passez en 24h/24.
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Programmez votre filtration <strong className="text-gray-700">en deux fois</strong> : une partie le matin tôt (avant le soleil), une partie en soirée. Évitez de tout mettre en plein après-midi. La chaleur dégrade le chlore avant qu&apos;il ait eu le temps d&apos;agir.
                  </p>
                </div>
              </div>

            </div>

            {/* CTA discret */}
            <div className="mt-10 flex items-center gap-4 p-5 bg-plouf-lavande/20 rounded-2xl border border-plouf/10">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Vous préférez ne pas vous en occuper ?</p>
                <p className="text-xs text-gray-400 mt-0.5">Un technicien Plouf mesure et corrige tout à chaque passage.</p>
              </div>
              <Link
                href="/tarifs#abonnement"
                className="flex-shrink-0 bg-plouf text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-plouf-dark transition-colors whitespace-nowrap"
              >
                Voir les formules →
              </Link>
            </div>

          </div>
        </section>

        {/* ══ SECTION 2 — CALENDRIER ════════════════════════════════════════════ */}
        <section
          className="px-6 py-20 border-t border-gray-100"
          style={{ background: "linear-gradient(160deg, #f5f7ff 0%, #edf9fb 100%)" }}
        >
          <div className="max-w-4xl mx-auto">

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Calendrier de la saison</p>
            <h2 className="font-title font-bold text-3xl text-gray-900 mb-3">
              Ce qu&apos;il faut faire, mois par mois
            </h2>
            <p className="text-gray-500 text-base mb-12 max-w-xl">
              L&apos;entretien d&apos;une piscine n&apos;est pas le même en mai et en août. Voici ce que font les techniciens Plouf à chaque période.
            </p>

            <div className="space-y-4">
              {CALENDRIER.map((periode) => (
                <details key={periode.mois} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="font-title font-bold text-gray-900 text-lg">{periode.mois}</span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${periode.tagColor}`}>
                        {periode.tag}
                      </span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 border-t border-gray-50">
                    <ul className="mt-4 space-y-2.5">
                      {periode.actions.map((action, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-600">
                          <span className="text-plouf font-bold flex-shrink-0 mt-0.5">✓</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>

            {/* CTA discret */}
            <div className="mt-10 flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Remise en route, hivernage, entretien courant</p>
                <p className="text-xs text-gray-400 mt-0.5">Plouf intervient à chaque étape de la saison. Tarifs fixes, produits inclus.</p>
              </div>
              <Link
                href="/tarifs"
                className="flex-shrink-0 bg-plouf text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-plouf-dark transition-colors whitespace-nowrap"
              >
                Voir les tarifs →
              </Link>
            </div>

          </div>
        </section>

        {/* ══ SECTION 3 — ERREURS FRÉQUENTES ═══════════════════════════════════ */}
        <section className="px-6 py-20 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Problèmes courants</p>
            <h2 className="font-title font-bold text-3xl text-gray-900 mb-3">
              Les erreurs les plus fréquentes, et comment les éviter
            </h2>
            <p className="text-gray-500 text-base mb-12 max-w-xl">
              Chaque semaine, nos techniciens voient les mêmes situations. Voici les diagnostics et les solutions.
            </p>

            <div className="space-y-5">
              {ERREURS.map((erreur) => (
                <div key={erreur.probleme} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="flex items-center gap-3 px-6 py-4 bg-gray-50/60 border-b border-gray-100">
                    <span className="text-xl">{erreur.icon}</span>
                    <h3 className="font-title font-bold text-gray-900">{erreur.probleme}</h3>
                    <span className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full ${erreur.graviteColor}`}>
                      {erreur.gravite}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="px-6 py-5">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Pourquoi ça arrive</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{erreur.cause}</p>
                    </div>
                    <div className="px-6 py-5">
                      <p className="text-xs font-semibold text-plouf/60 uppercase tracking-wide mb-2">Comment régler</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{erreur.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA discret */}
            <div className="mt-10 flex items-center gap-4 p-5 bg-red-50 rounded-2xl border border-red-100">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Eau verte en ce moment ?</p>
                <p className="text-xs text-gray-400 mt-0.5">Appelez-nous ou réservez une intervention, on passe rapidement avec le matériel adapté.</p>
              </div>
              <Link
                href="/reserver"
                className="flex-shrink-0 bg-plouf text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-plouf-dark transition-colors whitespace-nowrap"
              >
                Réserver →
              </Link>
            </div>

          </div>
        </section>

        {/* ══ SECTION 4 — CHLORE VS SEL ════════════════════════════════════════ */}
        <section
          className="px-6 py-20 border-t border-gray-100"
          style={{ background: "linear-gradient(160deg, #f5f7ff 0%, #edf9fb 100%)" }}
        >
          <div className="max-w-4xl mx-auto">

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Traitement</p>
            <h2 className="font-title font-bold text-3xl text-gray-900 mb-3">
              Chlore ou sel : lequel choisir ?
            </h2>
            <p className="text-gray-500 text-base mb-12 max-w-xl">
              La vraie réponse : les deux fonctionnent très bien. La vraie question, c&apos;est comment vous voulez gérer l&apos;entretien.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-10">

              {/* Chlore */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100" style={{ background: "linear-gradient(90deg, #E7EBFF, #f0f3ff)" }}>
                  <h3 className="font-title font-bold text-gray-900">Traitement au chlore</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Chlore liquide, galets ou granulés</p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Avantages</p>
                    <ul className="space-y-1.5">
                      {[
                        "Investissement initial faible (pas d'électrolyseur)",
                        "Produits disponibles partout, faciles à doser",
                        "Réaction rapide en cas de problème",
                        "Compatible avec tous les types de bassin",
                      ].map(a => (
                        <li key={a} className="flex gap-2 text-sm text-gray-600">
                          <span className="text-emerald-500 flex-shrink-0">+</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">Inconvénients</p>
                    <ul className="space-y-1.5">
                      {[
                        "Manipulation de produits chimiques",
                        "Dosage plus manuel, plus de vigilance",
                        "Odeur si le taux n'est pas bien géré",
                      ].map(a => (
                        <li key={a} className="flex gap-2 text-sm text-gray-600">
                          <span className="text-red-400 flex-shrink-0">−</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sel */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100" style={{ background: "linear-gradient(90deg, #D6F2F7, #edf9fb)" }}>
                  <h3 className="font-title font-bold text-gray-900">Traitement au sel (électrolyse)</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Électrolyseur + sel de piscine</p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Avantages</p>
                    <ul className="space-y-1.5">
                      {[
                        "Production automatique de chlore, moins d'interventions manuelles",
                        "Eau plus douce sur la peau et les yeux",
                        "Coût des produits réduit sur la durée",
                        "Moins d'odeur de chlore si bien réglé",
                      ].map(a => (
                        <li key={a} className="flex gap-2 text-sm text-gray-600">
                          <span className="text-emerald-500 flex-shrink-0">+</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">Inconvénients</p>
                    <ul className="space-y-1.5">
                      {[
                        "Investissement initial plus élevé (électrolyseur)",
                        "Entretien spécifique des cellules (détartrage)",
                        "Suivi pH encore plus important (tend à monter)",
                      ].map(a => (
                        <li key={a} className="flex gap-2 text-sm text-gray-600">
                          <span className="text-red-400 flex-shrink-0">−</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-6 bg-white rounded-2xl border-l-4 border-plouf shadow-sm">
              <p className="font-semibold text-gray-900 mb-2">Le verdict honnête</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Les deux se gèrent très bien, à condition d&apos;être <strong className="text-gray-700">régulier</strong>.
                Le sel simplifie la production de chlore mais ne supprime pas le suivi du pH.
                Si vous manquez de temps ou de rigueur, aucun des deux systèmes ne s&apos;entretient seul.
                C&apos;est là qu&apos;un suivi professionnel fait la différence.
              </p>
            </div>

            {/* CTA discret */}
            <div className="mt-8 flex items-center gap-4 p-5 bg-plouf-lavande/20 rounded-2xl border border-plouf/10">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Plouf intervient sur les deux types de traitement</p>
                <p className="text-xs text-gray-400 mt-0.5">Chlore ou sel, indiquez-le à la réservation. Le tarif sel est majoré de 15%.</p>
              </div>
              <Link
                href="/reserver"
                className="flex-shrink-0 bg-plouf text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-plouf-dark transition-colors whitespace-nowrap"
              >
                Réserver →
              </Link>
            </div>

          </div>
        </section>

        {/* ══ SECTION 5 — FAQ TECHNIQUE ═════════════════════════════════════════ */}
        <section className="px-6 py-20 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 text-center">Questions techniques</p>
            <h2 className="font-title font-bold text-3xl text-gray-900 mb-10 text-center">
              Ce que les propriétaires nous demandent le plus souvent
            </h2>
            <ConseilsFaq />
          </div>
        </section>

        {/* ══ CTA FINAL ═════════════════════════════════════════════════════════ */}
        <section
          className="px-6 py-20"
          style={{ background: "linear-gradient(135deg, #1313D6 0%, #2525e0 50%, #0E0EB8 100%)" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/60 text-sm mb-4">Vous avez lu jusqu&apos;ici.</p>
            <h2 className="font-title font-bold text-3xl md:text-4xl text-white mb-4 leading-tight">
              Vous savez maintenant ce qu&apos;implique<br />un entretien sérieux.
            </h2>
            <p className="text-plouf-eau text-xl font-title mb-8">
              Si vous préférez qu&apos;on s&apos;en occupe :
            </p>
            <Link
              href="/reserver"
              className="inline-block bg-white text-plouf px-8 py-5 rounded-2xl text-lg font-bold hover:bg-plouf-lavande transition-colors shadow-2xl"
            >
              Devis en 30 secondes →
            </Link>
            <p className="text-white/40 text-xs mt-5">Sans engagement · Paiement après intervention · On vous rappelle</p>
          </div>
        </section>

      </main>
    </div>
  );
}
