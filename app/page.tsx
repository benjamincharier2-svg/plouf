import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import AvantApresCarousel from "@/components/AvantApresCarousel";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Plouf Piscines — Entretien piscine à domicile Bordeaux, Médoc, Arcachon",
  description:
    "Entretien de piscine à domicile sur Bordeaux Métropole, Médoc et Bassin d'Arcachon. Abonnements dès 120 €/mois, interventions express dès 75 €. Rappel sous 2h.",
  alternates: { canonical: "https://ploufpiscines.fr" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ploufpiscines.fr",
  name: "Plouf Piscines",
  description:
    "Service d'entretien de piscines à domicile sur Bordeaux Métropole, le Médoc et le Bassin d'Arcachon.",
  url: "https://ploufpiscines.fr",
  telephone: "+33554540880",
  email: "contact@ploufpiscines.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "15 rue Thiac",
    addressLocality: "Bordeaux",
    postalCode: "33000",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.8378,
    longitude: -0.5792,
  },
  areaServed: [
    { "@type": "City", name: "Bordeaux" },
    { "@type": "City", name: "Mérignac" },
    { "@type": "City", name: "Pessac" },
    { "@type": "City", name: "Le Bouscat" },
    { "@type": "City", name: "Bruges" },
    { "@type": "City", name: "Arcachon" },
    { "@type": "City", name: "La Teste-de-Buch" },
    { "@type": "City", name: "Andernos-les-Bains" },
    { "@type": "City", name: "Pauillac" },
    { "@type": "City", name: "Lesparre-Médoc" },
  ],
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: ["https://ploufpiscines.fr"],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-28 pb-24 px-6 overflow-visible"
        style={{ background: "linear-gradient(135deg, #E7EBFF 0%, #D6F2F7 55%, #eaf7fb 100%)" }}
      >

        {/* Grille 55/45 — texte plus large */}
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-[55%_45%] gap-14 items-center">

          {/* ── Gauche ── */}
          <div className="py-8 pr-4">
            {/* Titre principal — taille réduite pour respirer */}
            <h1 className="font-title font-bold leading-[1.1] mb-6">
              <span className="text-[1.9rem] md:text-[3.4rem] text-gray-900 block">
                Votre piscine propre<br />tout l&apos;été.
              </span>
              <span className="text-[1.9rem] md:text-[3.4rem] text-plouf block mt-2">
                Sans y penser.
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-gray-500 text-lg leading-relaxed mb-2 max-w-lg">
              Un technicien vient chez vous, traite votre eau, nettoie
              votre bassin — et vous envoie un rapport de passage.
            </p>
            <p className="text-plouf font-semibold text-lg mb-9">
              Vous ne faites rien.
            </p>

            {/* CTA + Social proof — sur deux lignes si besoin */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-9">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center gap-2 bg-plouf text-white px-7 py-3.5 rounded-lg text-base font-semibold hover:bg-plouf-dark transition-colors shadow-md shadow-plouf/30 whitespace-nowrap"
              >
                Obtenir mon devis en 30 secondes →
              </Link>
              {/* Avatars + note */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["#9EE6F7","#bbd4fb","#c4e0b8","#f7d9a0","#f7b8b8"].map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600"
                      style={{ background: c, zIndex: 5 - i }}
                    >
                      {["M","T","S","A","L"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm leading-none">★★★★★</div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">4,9/5 sur Google</div>
                </div>
              </div>
            </div>

            {/* 3 micro-badges */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-plouf flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Dès 120€/mois
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-plouf flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Produits inclus
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-plouf flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Paiement après intervention
              </span>
            </div>
          </div>

          {/* ── Droite — photo + overlays ── */}
          <div className="relative mt-8 md:mt-0 pb-6 hidden md:block">
            {/* Photo principale — sans bouton play */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-plouf/10">
              <Image
                src="/hero.jpg"
                alt="Piscine entretenue par Plouf"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Overlay rapport — haut droite */}
            <div className="hidden md:block absolute top-4 -right-4 md:-right-6 bg-white rounded-2xl shadow-xl p-4 w-60 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-plouf-lavande flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-plouf" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Rapport de passage</div>
                  <div className="text-gray-400 text-xs">Aujourd&apos;hui à 10:37</div>
                </div>
              </div>
              <div className="flex gap-3 mb-2.5 text-xs">
                <div className="flex-1 bg-plouf-glacier/30 rounded-lg px-3 py-2 text-center">
                  <div className="text-gray-400">pH avant</div>
                  <div className="font-bold text-gray-800">7,2</div>
                </div>
                <div className="flex-1 bg-plouf-glacier/30 rounded-lg px-3 py-2 text-center">
                  <div className="text-gray-400">pH après</div>
                  <div className="font-bold text-gray-800">7,4</div>
                </div>
              </div>
              {/* Miniatures photos */}
              <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                {[1,2,3].map(i => (
                  <div key={i} className="aspect-square rounded-lg bg-plouf-glacier/40 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-plouf-glacier to-plouf-eau/30" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-700">Tout est parfait ✅<br />À bientôt !</p>
            </div>

            {/* Badge technicien — bas gauche */}
            <div className="absolute -bottom-4 left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-plouf-lavande flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-plouf" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">Technicien dédié<br />à votre secteur</div>
                <div className="text-gray-400 text-xs mt-0.5">Même personne à chaque visite</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLONGEZ. ON GÈRE. ──────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <p className="font-title font-bold text-2xl text-gray-900">
            Plongez.{" "}
            <span className="text-plouf">On gère.</span>
          </p>
          <div className="flex flex-wrap gap-8 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-plouf-lavande flex items-center justify-center text-plouf text-xs font-bold">✓</span>
              Sans engagement
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-plouf-lavande flex items-center justify-center text-plouf text-xs font-bold">✓</span>
              Réponse sous 2h
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-plouf-lavande flex items-center justify-center text-plouf text-xs font-bold">✓</span>
              Paiement après intervention
            </span>
          </div>
        </div>
      </div>

      {/* ── CAROUSEL AVANT · APRÈS ─────────────────────────────────────────── */}
      <AvantApresCarousel />

      {/* ── C'EST QUOI + PHOTO + 3 ÉTAPES ──────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_420px_1fr] gap-10 items-start">

          {/* Texte gauche */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Plouf, c&apos;est quoi ?</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-title">
              Vous n&apos;avez rien à faire.{" "}
              <span className="underline decoration-wavy decoration-plouf underline-offset-4">C&apos;est tout.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Vous avez une piscine. Vous n&apos;avez pas le temps — ou l&apos;envie — de vous en occuper.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Un technicien Plouf passe chez vous selon le planning choisi. Il <strong>mesure le pH</strong>, ajoute
              les produits nécessaires, <strong>nettoie le bassin</strong>. Avant de partir, il vous envoie
              un rapport de passage avec les photos et les mesures.
            </p>
            <p className="text-gray-700 font-semibold">
              Votre carte est débitée <strong>après</strong> le passage. Pas avant.
            </p>
          </div>

          {/* Photo technicien — centre */}
          <div>
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg shadow-plouf/10">
              <Image
                src="/technicien-action.jpg"
                alt="Technicien Plouf au travail"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* 3 étapes droite */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Comment ça marche</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 font-title">
              3 étapes, zéro appel téléphonique
            </h2>
            <div className="space-y-4">
              {[
                ["①", "Configurez en ligne", "Taille du bassin + fréquence → prix immédiat"],
                ["②", "On vous rappelle sous 2h", "Pour organiser l'intervention au mieux"],
                ["③", "On vient. On s'occupe.", "Rapport de passage. Paiement après."],
              ].map(([n, t, d]) => (
                <div key={n} className="flex gap-4 items-start p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-brand-gris-tres-clair to-white hover:border-plouf/20 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-plouf text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-md shadow-plouf/30">
                    {n}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── POURQUOI PLOUF — 5 colonnes ────────────────────────────────────── */}
      <section id="pourquoi-plouf" className="py-16 px-6 bg-gray-50/60 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-10 font-title">
            Pourquoi choisir Plouf ?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ), titre: "Rappel sous 2h", desc: "On vous contacte pour organiser l'intervention par téléphone." },
              { icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              ), titre: "Vous payez après", desc: "Le paiement est déclenché automatiquement après le passage." },
              { icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              ), titre: "Rapport à chaque passage", desc: "Photos et mesures envoyées après chaque visite." },
              { icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ), titre: "On connaît votre secteur", desc: "Des équipes dédiées par zone, pas de perte de temps." },
            ].map((item) => (
              <div key={item.titre} className="flex flex-col items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-plouf-lavande text-plouf flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{item.titre}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS — 2 CARTES ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-plouf/60 uppercase tracking-widest text-center mb-4">Les formules</p>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3 font-title">
            Des tarifs clairs.{" "}
            <span className="underline decoration-wavy decoration-plouf underline-offset-4">Tout est inclus.</span>
          </h2>
          <p className="text-center text-gray-500 mb-12">Deux façons de travailler avec Plouf.</p>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Carte Intervention ponctuelle */}
            <div className="flex rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              {/* Photo gauche */}
              <div className="relative w-2/5 flex-shrink-0 bg-plouf-glacier/30">
                <Image
                  src="/technicien-action.jpg"
                  alt="Technicien Plouf au travail"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Infos droite */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Intervention ponctuelle</p>
                  <p className="text-2xl font-bold text-gray-900 font-title">Dès 75€</p>
                  <p className="text-xs text-gray-400 mt-0.5">Sans abonnement</p>
                </div>
                <ul className="space-y-1.5 mb-6 flex-1">
                  {[
                    "Passage unique sur demande",
                    "Remise en route printemps",
                    "Nettoyage complet",
                    "Hivernage & traitement eau verte",
                  ].map(item => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-plouf font-bold flex-shrink-0">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/reserver"
                  className="block text-center border-2 border-plouf text-plouf font-semibold py-3 rounded-xl hover:bg-plouf hover:text-white transition-colors text-sm"
                >
                  Réserver une intervention →
                </Link>
              </div>
            </div>

            {/* Carte Abonnement saisonnier */}
            <div className="flex rounded-2xl overflow-hidden border-2 border-plouf/20 shadow-sm hover:shadow-md transition-shadow">
              {/* Photo gauche */}
              <div className="relative w-2/5 flex-shrink-0 bg-plouf-glacier/30">
                <Image
                  src="/hero.jpg"
                  alt="Piscine entretenue par Plouf"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Infos droite */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1 bg-plouf text-white text-xs font-bold px-2.5 py-1 rounded-full mb-2">
                    ★ Le plus choisi
                  </div>
                  <p className="text-xs font-semibold text-plouf uppercase tracking-widest mb-1">Abonnement saisonnier</p>
                  <p className="text-2xl font-bold text-gray-900 font-title">Dès 120€<span className="text-base font-normal text-gray-500">/mois</span></p>
                  <p className="text-xs text-gray-400 mt-0.5">Mai → octobre · sans engagement</p>
                </div>
                <ul className="space-y-1.5 mb-6 flex-1">
                  {[
                    "Produits de traitement inclus",
                    "Rapport de passage avec photos et mesures",
                    "Même technicien à chaque visite",
                    "Paiement après intervention",
                  ].map(item => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-plouf font-bold flex-shrink-0">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/tarifs"
                  className="block text-center bg-plouf text-white font-semibold py-3 rounded-xl hover:bg-plouf-dark transition-colors text-sm"
                >
                  Voir les formules →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── AVIS CLIENTS ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50/60 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 text-center">Ils ont testé Plouf</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 font-title text-center">Ce qu&apos;en disent les clients</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { avis: "Réservé un mardi. Mercredi piscine traitée. Jeudi rapport de passage reçu.", nom: "Marie L.", lieu: "Mérignac", file: "avis-marie.jpg" },
              { avis: "Le paiement après le passage m'a convaincu. J'ai pris l'abo pour la saison.", nom: "Thomas D.", lieu: "Le Bouscat", file: "avis-thomas.jpg" },
              { avis: "Résidence secondaire au Médoc — Plouf passe, je reçois les photos. Parfait.", nom: "Sophie R.", lieu: "Pauillac", file: "avis-sophie.jpg" },
            ].map((item) => (
              <div key={item.nom} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
                <p className="text-gray-700 text-sm italic mb-3">&ldquo;{item.avis}&rdquo;</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full border-2 border-plouf-glacier flex-shrink-0 overflow-hidden relative">
                    <Image src={`/${item.file}`} alt={item.nom} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-800">{item.nom}</span>
                    <span className="text-gray-400 text-xs"> · {item.lieu}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EAU VERTE — supprimé ──────────────────────────────────────────── */}
      {false && <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border-2 border-plouf/15 shadow-sm">
            <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-5">
              ⚠️ EAU VERTE
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-title">
              Votre eau est verte ?<br />
              <span className="underline decoration-wavy decoration-plouf underline-offset-4">Ça arrive. On règle ça.</span>
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              Une piscine sans traitement quelques semaines devient verte.
              Pas irrémédiable — mais pas avec un bidon du supermarché.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6 max-w-sm">
              {[
                { tag: "AVANT", color: "border-green-300 bg-green-50", tagColor: "text-green-700", file: "eau-verte-avant.jpg" },
                { tag: "APRÈS", color: "border-plouf-glacier bg-plouf-glacier/20", tagColor: "text-plouf", file: "eau-verte-apres.jpg" },
              ].map(item => (
                <div key={item.tag} className={`relative aspect-[4/3] rounded-xl border-2 border-dashed ${item.color} flex flex-col items-center justify-center gap-1 overflow-hidden`}>
                  <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                  <p className="text-gray-400 text-xs">📁 {item.file}</p>
                  <span className={`absolute top-2 left-2 text-xs font-bold ${item.tagColor} bg-white/80 px-2 py-0.5 rounded-full`}>{item.tag}</span>
                </div>
              ))}
            </div>
            <Link href="/eau-verte" className="inline-block bg-plouf text-white font-bold px-8 py-4 rounded-xl hover:bg-plouf-dark transition-colors">
              Envoyer une photo · rappel sous 2h →
            </Link>
            <p className="text-xs text-gray-500 mt-3">Dès 150€ · Diagnostic gratuit</p>
          </div>
        </div>
      </section>}

      {/* ── PARRAINAGE + ZONES ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="bg-gradient-to-br from-plouf-sable to-amber-50 border-2 border-yellow-200 rounded-2xl p-8">
            <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-5">
              NOUVEAU
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-title">
              Parrainage voisin · <span className="text-plouf">–20€ pour vous, –20€ pour eux</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Votre voisin a une piscine ? Recommandez Plouf : vous gagnez chacun <strong>20€ de remise</strong> sur votre prochaine facture.
            </p>
            <p className="text-xs text-gray-400 italic">
              Plouf optimise ses tournées quand plusieurs maisons d&apos;une même rue sont clientes — moins de déplacements, service plus réactif.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 text-center">Questions fréquentes</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 font-title text-center">
            Tout ce qu&apos;on nous demande souvent
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        className="pt-20 pb-14 px-6"
        style={{ background: "linear-gradient(180deg, #111827 0%, #0f1623 100%)" }}
      >
        {/* CTA intégré en haut du footer */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.4fr_1fr] gap-10 items-center mb-14 pb-14 border-b border-gray-800">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 font-title">
              Prêt à profiter de votre piscine ?
            </h2>
            <p className="text-xl text-plouf-eau mb-5 font-title">Plongez, on gère.</p>
            <div className="flex flex-wrap gap-5 text-gray-400 text-sm">
              <span>✓ Sans engagement</span>
              <span>✓ Rappel sous 2h</span>
              <span>✓ Paiement après intervention</span>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/reserver"
              className="inline-block bg-white text-plouf px-8 py-5 rounded-2xl text-lg font-bold hover:bg-plouf-lavande transition-colors shadow-2xl"
            >
              Obtenir mon devis gratuitement →
            </Link>
          </div>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <Image src="/logo-blanc.png" alt="plouf!" width={70} height={32} className="object-contain mb-3" />
            <p className="text-gray-400 text-sm italic mb-1">Plongez, on gère.</p>
            <p className="text-gray-500 text-xs leading-relaxed">Entretien · Traitement · Suivi saisonnier · Mai → Octobre</p>
          </div>
          <div>
            <p className="text-plouf-eau text-sm font-semibold mb-4">Zones</p>
            <p className="text-gray-400 text-sm mb-1">Bordeaux Métropole</p>
            <p className="text-gray-400 text-sm mb-1">Médoc</p>
            <p className="text-gray-400 text-sm">Bassin d&apos;Arcachon</p>
          </div>
          <div>
            <p className="text-plouf-eau text-sm font-semibold mb-4">Pages</p>
            <Link href="/interventions" className="text-gray-400 text-sm block mb-1 hover:text-white transition-colors">Interventions</Link>
            <Link href="/mentions-legales" className="text-gray-400 text-sm block hover:text-white transition-colors">Mentions légales</Link>
          </div>
          <div>
            <p className="text-plouf-eau text-sm font-semibold mb-4">Contact</p>
            <a href="tel:0554540880" className="text-gray-400 text-sm block mb-2 hover:text-white transition-colors">
              05 54 54 08 80
            </a>
            <a href="mailto:contact@ploufpiscines.fr" className="text-gray-400 text-sm block mb-4 hover:text-white transition-colors">
              contact@ploufpiscines.fr
            </a>
            <div className="flex gap-2">
              {["IG", "FB", "WA"].map(s => (
                <span key={s} className="w-8 h-8 rounded-full border border-gray-700 text-gray-400 text-xs flex items-center justify-center hover:border-plouf-eau hover:text-white transition-colors cursor-pointer">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-600 text-xs">© 2026 Plouf Piscines · ploufpiscines.fr</p>
        </div>
      </footer>

      {/* ── BARRE CTA MOBILE ───────────────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 px-4 py-3 flex items-center gap-4"
        style={{ background: "linear-gradient(90deg, #111827, #1313D6)" }}>
        <div className="flex-1">
          <div className="text-white font-bold text-sm">Devis en 30 secondes</div>
          <div className="text-gray-400 text-xs">Sans engagement</div>
        </div>
        <Link href="/reserver" className="bg-white text-plouf text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-plouf-lavande transition-colors">
          Démarrer →
        </Link>
      </div>

    </main>
  );
}
