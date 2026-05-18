import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
  title: "À propos — Plouf Piscines, techniciens piscine à Bordeaux",
  description:
    "Plouf Piscines, c'est une équipe de techniciens locaux sur Bordeaux Métropole, le Médoc et le Bassin d'Arcachon. Entretien régulier, produits inclus, rapport après chaque passage.",
  alternates: { canonical: "https://ploufpiscines.fr/a-propos" },
};

const VALEURS = [
  {
    phrase: "On débite après.",
    explication:
      "Votre carte est pré-autorisée à la réservation, mais le paiement n'est déclenché qu'après l'intervention. Si on n'est pas passé, vous ne payez pas. C'est ça, la confiance.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    phrase: "On envoie les photos.",
    explication:
      "Chaque technicien part avec un protocole : photos avant, photos après, relevés pH. Vous recevez un rapport de passage. Pas pour se justifier — parce que vous méritez de savoir ce qui se passe chez vous.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    phrase: "On rappelle sous 2h.",
    explication:
      "L'été n'attend pas. Une piscine peut virer en 48h si rien n'est fait. On s'est engagé sur 2 heures de délai de rappel — et on tient cet engagement parce qu'on a des équipes dédiées par secteur, pas un call center qui dispatche.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const ZONES = [
  {
    nom: "Bordeaux Métropole",
    communes: ["Bordeaux", "Mérignac", "Le Bouscat", "Bruges", "Eysines", "Le Haillan", "Caudéran", "Talence", "Pessac"],
  },
  {
    nom: "Médoc",
    communes: ["Lesparre-Médoc", "Soulac-sur-Mer", "Le Verdon-sur-Mer", "Saint-Vivien-de-Médoc", "Vendays-Montalivet", "Grayan-et-l'Hôpital", "Vensac", "Queyrac", "Hourtin", "Naujac-sur-Mer", "Talais"],
  },
  {
    nom: "Bassin d'Arcachon",
    communes: ["Arcachon", "La Teste-de-Buch", "Andernos-les-Bains", "Lège-Cap-Ferret", "Gujan-Mestras"],
  },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-white">

      <Header />

      <main className="pt-24">

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <section className="relative px-6 py-28 overflow-hidden">
          <Image
            src="/hero.jpg"
            alt="Piscine entretenue par Plouf"
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(19,19,214,0.82) 0%, rgba(14,14,180,0.68) 45%, rgba(0,60,100,0.72) 100%)" }}
          />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-5">À propos</p>
            <h1 className="font-title font-bold text-4xl md:text-[3.2rem] text-white leading-tight mb-5">
              Plouf, c&apos;est quoi ?
            </h1>
            <p className="text-white/80 text-xl max-w-xl mx-auto leading-relaxed">
              Un service d&apos;entretien de piscines à domicile, né à Bordeaux.
              Des techniciens locaux, un suivi sérieux, zéro surprise.
            </p>
          </div>
        </section>

        {/* ══ SECTION 1 — POURQUOI PLOUF EXISTE ════════════════════════════════ */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-14 items-center">

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">L&apos;origine</p>
              <h2 className="font-title font-bold text-3xl text-gray-900 mb-6 leading-snug">
                Pourquoi Plouf existe
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Bordeaux et ses environs concentrent des milliers de piscines privées. Une bonne partie appartient à des propriétaires de résidences secondaires, de maisons louées à la saison, ou simplement à des gens qui manquent de temps.
                </p>
                <p>
                  Le constat était simple : <strong className="text-gray-800">la plupart de ces piscines sont mal entretenues.</strong> Pas par négligence, mais parce que l&apos;entretien d&apos;une piscine est une compétence technique, qui demande de la régularité et du bon matériel.
                </p>
                <p>
                  Les magasins de piscines vendent des produits. Les piscinistes font de l&apos;installation. Il manquait un service simple : quelqu&apos;un qui <em>passe chez vous, régulièrement, et s&apos;occupe de tout.</em>
                </p>
                <p>
                  C&apos;est Plouf.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-plouf/10">
                <Image
                  src="/technicien-action.jpg"
                  alt="Technicien Plouf"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Badge flottant */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg px-5 py-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-0.5">Secteur d&apos;activité</p>
                <p className="font-bold text-gray-900 text-sm">Gironde — Bordeaux, Médoc,<br />Bassin d&apos;Arcachon</p>
              </div>
            </div>

          </div>
        </section>

        {/* ══ SECTION 2 — CE QU'ON FAIT ════════════════════════════════════════ */}
        <section
          className="px-6 py-20 border-t border-gray-100"
          style={{ background: "linear-gradient(160deg, #f5f7ff 0%, #edf9fb 100%)" }}
        >
          <div className="max-w-4xl mx-auto">

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">L&apos;activité</p>
            <h2 className="font-title font-bold text-3xl text-gray-900 mb-3">
              Ce qu&apos;on fait concrètement
            </h2>
            <p className="text-gray-500 text-base mb-12 max-w-xl">
              Pas du storytelling. Trois lignes sur ce qui se passe vraiment lors d&apos;un passage Plouf.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  titre: "On intervient chez vous",
                  texte: "Un technicien dédié à votre secteur passe à l'heure prévue. Pas besoin d'être présent. Il a accès à votre jardin selon les instructions laissées à la réservation.",
                },
                {
                  num: "02",
                  titre: "On traite votre eau",
                  texte: "Mesure du pH, du chlore libre, du TAC. Ajout des produits nécessaires. Nettoyage du bassin, des skimmers, contrôle du filtre. Les produits sont apportés — rien à stocker chez vous.",
                },
                {
                  num: "03",
                  titre: "On vous envoie le rapport",
                  texte: "Photos avant/après, relevés des paramètres, commentaire du technicien si nécessaire. Un rapport vous est envoyé avant qu'il quitte votre propriété.",
                },
              ].map((step) => (
                <div key={step.num} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="font-title font-black text-4xl text-plouf/15 mb-4 leading-none">{step.num}</div>
                  <h3 className="font-title font-bold text-gray-900 text-lg mb-3">{step.titre}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.texte}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══ SECTION 3 — ZONES ════════════════════════════════════════════════ */}
        <section className="px-6 py-20 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Notre territoire</p>
            <h2 className="font-title font-bold text-3xl text-gray-900 mb-3">
              Une équipe dédiée par secteur
            </h2>
            <p className="text-gray-500 text-base mb-12 max-w-xl">
              On n&apos;envoie pas n&apos;importe qui n&apos;importe où. Chaque technicien a sa zone — il la connaît, il y est tous les jours. C&apos;est la même personne qui passe chez vous à chaque visite.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {ZONES.map((zone) => (
                <div key={zone.nom} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div
                    className="px-5 py-4 border-b border-gray-50"
                    style={{ background: "linear-gradient(90deg, #E7EBFF, #D6F2F7)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-plouf">📍</span>
                      <h3 className="font-title font-bold text-gray-900 text-sm">{zone.nom}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5">
                      {zone.communes.map((c) => (
                        <span key={c} className="text-xs bg-gray-50 border border-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-plouf-lavande/20 border border-plouf/10 rounded-2xl px-6 py-4 text-sm text-gray-600">
              <strong className="text-gray-800">Votre commune n&apos;est pas dans la liste ?</strong>{" "}
              Écrivez-nous à <a href="mailto:contact@ploufpiscines.fr" className="text-plouf underline underline-offset-2">contact@ploufpiscines.fr</a> — on étudie les extensions de zone régulièrement.
            </div>

          </div>
        </section>

        {/* ══ SECTION 4 — VALEURS ══════════════════════════════════════════════ */}
        <section
          className="px-6 py-20 border-t border-gray-100"
          style={{ background: "linear-gradient(160deg, #f5f7ff 0%, #edf9fb 100%)" }}
        >
          <div className="max-w-4xl mx-auto">

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Ce qu&apos;on croit</p>
            <h2 className="font-title font-bold text-3xl text-gray-900 mb-12">
              Trois engagements. Pas de bullet points abstraits.
            </h2>

            <div className="space-y-6">
              {VALEURS.map((v) => (
                <div key={v.phrase} className="flex gap-6 bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-plouf-lavande text-plouf flex items-center justify-center flex-shrink-0">
                    {v.icon}
                  </div>
                  <div>
                    <p className="font-title font-bold text-gray-900 text-xl mb-2">{v.phrase}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.explication}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══ CTA FINAL ═════════════════════════════════════════════════════════ */}
        <section className="px-6 py-20 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-3xl px-8 py-14 text-center"
              style={{ background: "linear-gradient(135deg, #E7EBFF 0%, #D6F2F7 100%)" }}
            >
              <h2 className="font-title font-bold text-2xl md:text-3xl text-gray-900 mb-3 leading-snug">
                Une question ? Une piscine à entretenir ?
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                On répond à tous les messages. Réservation, devis, question technique — écrivez, on revient vite.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/reserver"
                  className="inline-flex items-center justify-center gap-2 bg-plouf text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-plouf-dark transition-colors shadow-md shadow-plouf/20"
                >
                  Obtenir un devis →
                </Link>
                <a
                  href="tel:0554540880"
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-900/10 text-gray-700 px-7 py-3.5 rounded-xl text-sm font-semibold hover:border-plouf hover:text-plouf transition-colors"
                >
                  📞 05 54 54 08 80
                </a>
                <a
                  href="mailto:contact@ploufpiscines.fr"
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-900/10 text-gray-700 px-7 py-3.5 rounded-xl text-sm font-semibold hover:border-plouf hover:text-plouf transition-colors"
                >
                  ✉ contact@ploufpiscines.fr
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
