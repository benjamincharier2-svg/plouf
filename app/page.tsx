import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Image src="/logo-bleu.png" alt="plouf!" width={80} height={36} className="object-contain" />
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <Link href="/interventions" className="hover:text-[#1A00CC] transition-colors">Interventions</Link>
              <Link href="/eau-verte" className="hover:text-[#1A00CC] transition-colors">Eau verte</Link>
              <Link href="/faq" className="hover:text-[#1A00CC] transition-colors">FAQ</Link>
            </nav>
          </div>
          <Link
            href="/reserver"
            className="bg-[#1A00CC] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1200A0] transition-colors"
          >
            Réserver une intervention →
          </Link>
        </div>
      </header>

      {/* HERO — 2 colonnes */}
      <section className="pt-28 pb-20 px-6 bg-gradient-to-b from-[#EEE9FF] to-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Colonne gauche */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#1A00CC]/20 text-[#1A00CC] text-sm font-medium px-4 py-1.5 rounded-full mb-8">
              📍 Bordeaux Métropole · Médoc · Bassin d&apos;Arcachon
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
              Votre piscine propre<br />
              tout l&apos;été.<br />
              <span className="text-[#1A00CC]">Sans y penser.</span>
            </h1>
            <p className="text-2xl font-semibold text-[#1A00CC] mb-6">Plongez, on gère.</p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Un technicien vient chez vous, traite votre eau, nettoie votre bassin
              — et vous envoie le rapport sur WhatsApp. Vous ne faites rien.
            </p>
            <Link
              href="/reserver"
              className="inline-block bg-[#1A00CC] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#1200A0] transition-colors shadow-lg shadow-[#1A00CC]/20"
            >
              Obtenir mon devis en 30 secondes →
            </Link>
            <div className="flex gap-6 mt-5 text-sm text-gray-500">
              <span>🏷 Dès 120€/mois</span>
              <span>💧 Produits inclus</span>
              <span>💳 Paiement après</span>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="relative">
            {/* Photo héro */}
            <div className="relative w-full aspect-[4/3] bg-[#EEE9FF] rounded-[40%_18%_18%_60%/_30%_14%_14%_60%] overflow-hidden flex items-center justify-center">
              <span className="text-6xl">🏊</span>
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A00CC]/10 to-transparent" />
            </div>

            {/* Overlay WhatsApp */}
            <div className="absolute top-6 -right-4 bg-white border-2 border-gray-100 rounded-2xl shadow-xl p-4 w-56">
              <div className="text-green-600 text-xs font-bold mb-2">📱 Rapport WhatsApp</div>
              <div className="bg-green-50 rounded-xl p-3 text-xs text-gray-700">
                <div className="flex justify-between mb-2 text-gray-500">
                  <span>pH avant · 7,2</span><span>pH après · 7,4</span>
                </div>
                <div className="bg-gray-100 rounded-lg h-10 mb-2 flex items-center justify-center text-gray-400 text-xs">📷 bassin après</div>
                <div>Tout est parfait ✅<br />À bientôt !</div>
              </div>
            </div>

            {/* Badge confiance */}
            <div className="absolute -bottom-4 -left-4 bg-white border border-gray-100 rounded-2xl shadow-xl p-4">
              <div className="text-yellow-400 text-sm mb-1">★★★★★</div>
              <div className="font-bold text-gray-900 text-sm">4,9/5 sur Google</div>
              <div className="text-gray-400 text-xs">+200 avis clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* C'EST QUOI + 3 ÉTAPES — 2 colonnes */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Gauche : explication */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Plouf, c&apos;est quoi ?</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Vous n&apos;avez rien à faire.{" "}
              <span className="underline decoration-wavy decoration-[#1A00CC] underline-offset-4">C&apos;est tout.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Vous avez une piscine. Vous n&apos;avez pas le temps — ou l&apos;envie — de vous en occuper.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Un technicien Plouf passe chez vous selon le planning choisi.
              Il <strong>mesure le pH</strong>, ajoute les produits nécessaires,
              <strong> nettoie le bassin</strong>. Avant de partir, il vous envoie
              un message WhatsApp avec les photos et les mesures.
            </p>
            <p className="text-gray-700 font-semibold">
              Votre carte est débitée <strong>après</strong> le passage. Pas avant.
            </p>
          </div>

          {/* Droite : 3 étapes */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Comment ça marche</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              3 étapes, zéro appel téléphonique
            </h2>
            <div className="space-y-4">
              {[
                ["①", "Configurez en ligne", "Taille du bassin + fréquence → prix immédiat"],
                ["②", "Choisissez votre créneau", "On confirme sous 20 min par SMS / WhatsApp"],
                ["③", "On vient. On s'occupe.", "Rapport WhatsApp. Paiement après."],
              ].map(([n, t, d]) => (
                <div key={n} className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#1A00CC] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
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

      {/* TARIFS */}
      <section className="py-20 px-6 bg-[#EEE9FF]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center mb-4">Les formules</p>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            Des tarifs clairs.{" "}
            <span className="underline decoration-wavy decoration-[#1A00CC] underline-offset-4">Tout est inclus.</span>
          </h2>
          <p className="text-center text-gray-500 mb-14">Deux façons de travailler avec Plouf.</p>

          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6">
            {/* Abonnement */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="inline-block bg-[#1A00CC] text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                    Option 1 — Abonnement saisonnier
                  </span>
                  <p className="text-xs text-gray-400">mai → octobre · sans engagement</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-[#EEE9FF] text-[#1A00CC] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  Le + économique
                </span>
              </div>

              <div className="rounded-xl border border-gray-200 overflow-hidden mb-5">
                <div className="grid grid-cols-3 bg-[#1A00CC] text-white text-xs font-semibold">
                  <div className="p-3"></div>
                  <div className="p-3 text-center">Bimensuel<br /><span className="font-normal opacity-75">2×/mois</span></div>
                  <div className="p-3 text-center">
                    Hebdomadaire <span className="bg-yellow-300 text-yellow-900 px-1 rounded text-xs">⭐ reco</span>
                    <br /><span className="font-normal opacity-75">4×/mois</span>
                  </div>
                </div>
                {[
                  { label: "Petite", sub: "jusqu'à 30 m³", bimensuel: 120, hebdo: 199 },
                  { label: "Moyenne", sub: "30 à 60 m³", bimensuel: 145, hebdo: 245 },
                  { label: "Grande", sub: "60 m³ et +", bimensuel: 179, hebdo: 299 },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <div className="p-3">
                      <p className="font-semibold text-gray-800 text-sm">{row.label}</p>
                      <p className="text-gray-400 text-xs">{row.sub}</p>
                    </div>
                    <div className="p-3 text-center text-gray-600 text-sm font-medium">{row.bimensuel}€/mois</div>
                    <div className="p-3 text-center font-bold text-[#1A00CC] text-sm">{row.hebdo}€/mois</div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 italic mb-4">Traitement au sel (électrolyse) : +15% sur tous les tarifs.</p>

              <div className="border-t border-dashed border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Inclus dans chaque passage</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Produits de traitement fournis et posés",
                    "Nettoyage du bassin",
                    "Mesure pH avant / après",
                    "Rapport WhatsApp avec photos",
                    "Alerte immédiate si anomalie",
                    "Même technicien à chaque visite",
                  ].map(item => (
                    <div key={item} className="flex gap-2 text-xs text-gray-600">
                      <span className="text-[#1A00CC] font-bold">✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ponctuel */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <span className="inline-block bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-2">
                Option 2 — Intervention ponctuelle
              </span>
              <p className="text-xs text-gray-400 mb-5">sans abonnement</p>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Un passage unique — avant des locataires, après une absence,
                ou si l&apos;eau a tourné. On vient, on règle.
              </p>
              <div className="space-y-2">
                {[
                  ["Passage ponctuel", "dès 75€"],
                  ["Nettoyage complet", "120€"],
                  ["Remise en route printemps", "250€"],
                  ["Hivernage complet", "290€"],
                  ["Changement sable filtre", "220€"],
                  ["Traitement eau verte", "dès 150€"],
                ].map(([label, tarif]) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-white/10 text-sm">
                    <span className="text-gray-300">{label}</span>
                    <span className="font-bold text-white">{tarif}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/interventions"
                className="mt-6 w-full block text-center border-2 border-white text-white font-semibold py-3 rounded-xl hover:bg-white hover:text-gray-900 transition-colors text-sm"
              >
                Réserver une intervention ponctuelle →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GARANTIES */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center mb-4">Nos garanties</p>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
            Pour votre tranquillité — pas juste un argument.
          </h2>
          <div className="grid md:grid-cols-5 gap-5">
            {[
              { icon: "💳", titre: "Vous payez après, pas avant", desc: "Stripe débite après le passage. Aucun passage = aucun débit." },
              { icon: "⏱️", titre: "Réponse sous 20 minutes", desc: "Confirmation SMS, même le week-end." },
              { icon: "📋", titre: "Un rapport après chaque passage", desc: "Photos + pH avant/après sur WhatsApp." },
              { icon: "🔄", titre: "Annulation sans frais", desc: "Jusqu'à 24h avant, sans justification." },
              { icon: "📍", titre: "On connaît votre secteur", desc: "Équipes dédiées par zone, pas d'imprévu." },
            ].map((item) => (
              <div key={item.titre} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="font-semibold text-gray-900 text-sm mb-2">{item.titre}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS + EAU VERTE — 2 colonnes */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Avis */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Ils ont testé Plouf</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Ce qu&apos;en disent les clients</h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { avis: "Réservé un mardi. Mercredi piscine traitée. Jeudi photos sur WhatsApp.", nom: "Marie L.", lieu: "Mérignac" },
                { avis: "Le paiement après le passage m'a convaincu. J'ai pris l'abo pour la saison.", nom: "Thomas D.", lieu: "Le Bouscat" },
                { avis: "Résidence secondaire au Médoc — Plouf passe, je reçois les photos. Parfait.", nom: "Sophie R.", lieu: "Pauillac" },
              ].map((item) => (
                <div key={item.nom} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
                  <p className="text-gray-700 text-sm italic mb-3">&ldquo;{item.avis}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#EEE9FF] flex items-center justify-center text-xs">👤</div>
                    <span className="text-sm font-semibold text-gray-800">{item.nom}</span>
                    <span className="text-gray-400 text-xs">· {item.lieu}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eau verte CTA */}
          <div className="bg-[#EEE9FF] rounded-2xl p-8 border-2 border-[#1A00CC]/20 h-fit self-center">
            <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-5">
              ⚠️ EAU VERTE
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Votre eau est verte ?<br />
              <span className="underline decoration-wavy decoration-[#1A00CC] underline-offset-4">Ça arrive. On règle ça.</span>
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              Une piscine sans traitement quelques semaines devient verte.
              Pas irrémédiable — mais pas avec un bidon du supermarché.
            </p>
            {/* Avant/après */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs border border-gray-200">📷 avant</div>
              <div className="bg-white rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs border border-gray-200">📷 après</div>
            </div>
            <Link
              href="/eau-verte"
              className="w-full block text-center bg-[#1A00CC] text-white font-bold py-4 rounded-xl hover:bg-[#1200A0] transition-colors"
            >
              Envoyer une photo · rappel sous 2h →
            </Link>
            <p className="text-xs text-gray-500 text-center mt-3">Dès 150€ · Diagnostic gratuit</p>
          </div>
        </div>
      </section>

      {/* PARRAINAGE */}
      <section className="py-20 px-6 bg-[#EEE9FF]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-8">
          {/* Parrainage */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8">
            <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-5">
              NOUVEAU
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Parrainage voisin · <span className="text-[#1A00CC]">–20€ pour vous, –20€ pour eux</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Votre voisin a une piscine ? Recommandez Plouf : vous gagnez
              chacun <strong>20€ de remise</strong> sur votre prochaine facture.
            </p>
            <p className="text-xs text-gray-400 italic">
              Plouf optimise ses tournées quand plusieurs maisons d&apos;une même rue sont clientes —
              moins de déplacements, service plus réactif.
            </p>
          </div>

          {/* Zones */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Zones desservies</p>
            <h3 className="font-bold text-gray-900 mb-5">Où on intervient</h3>
            <div className="bg-[#EEE9FF] rounded-xl h-36 flex items-center justify-center text-gray-400 text-sm mb-5 border border-[#1A00CC]/10">
              🗺 Gironde — Bordeaux · Médoc · Bassin
            </div>
            <div className="flex flex-wrap gap-2">
              {["Bordeaux Métropole", "Médoc", "Bassin d'Arcachon"].map(z => (
                <span key={z} className="bg-[#EEE9FF] text-[#1A00CC] text-xs font-medium px-3 py-1.5 rounded-full border border-[#1A00CC]/20">
                  📍 {z}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6 bg-[#1A00CC]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-3">
              Prêt à profiter de votre piscine ?
            </h2>
            <p className="text-2xl text-white/80 mb-6">Plongez, on gère.</p>
            <div className="flex gap-6 text-white/60 text-sm">
              <span>✓ Sans engagement</span>
              <span>✓ Réponse sous 20 min</span>
              <span>✓ Paiement après intervention</span>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/reserver"
              className="inline-block bg-white text-[#1A00CC] px-8 py-5 rounded-2xl text-lg font-bold hover:bg-[#EEE9FF] transition-colors shadow-xl"
            >
              Obtenir mon devis gratuitement →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER — 4 colonnes */}
      <footer className="bg-gray-900 py-14 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <Image src="/logo-blanc.png" alt="plouf!" width={70} height={32} className="object-contain mb-3" />
            <p className="text-gray-400 text-sm italic mb-1">Plongez, on gère.</p>
            <p className="text-gray-500 text-xs leading-relaxed">Entretien · Traitement · Suivi saisonnier · Mai → Octobre</p>
          </div>
          <div>
            <p className="text-[#1A00CC] text-sm font-semibold mb-4">Zones</p>
            <p className="text-gray-400 text-sm mb-1">Bordeaux Métropole</p>
            <p className="text-gray-400 text-sm mb-1">Médoc</p>
            <p className="text-gray-400 text-sm">Bassin d&apos;Arcachon</p>
          </div>
          <div>
            <p className="text-[#1A00CC] text-sm font-semibold mb-4">Pages</p>
            <Link href="/interventions" className="text-gray-400 text-sm block mb-1 hover:text-white transition-colors">Interventions</Link>
            <Link href="/eau-verte" className="text-gray-400 text-sm block mb-1 hover:text-white transition-colors">Eau verte</Link>
            <Link href="/faq" className="text-gray-400 text-sm block mb-1 hover:text-white transition-colors">FAQ</Link>
            <Link href="/mentions-legales" className="text-gray-400 text-sm block hover:text-white transition-colors">Mentions légales</Link>
          </div>
          <div>
            <p className="text-[#1A00CC] text-sm font-semibold mb-4">Contact</p>
            <a href="mailto:contact@ploufpiscines.fr" className="text-gray-400 text-sm block mb-4 hover:text-white transition-colors">
              contact@ploufpiscines.fr
            </a>
            <div className="flex gap-2">
              {["IG", "FB", "WA"].map(s => (
                <span key={s} className="w-8 h-8 rounded-full border border-gray-700 text-gray-400 text-xs flex items-center justify-center hover:border-gray-400 hover:text-white transition-colors cursor-pointer">
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

      {/* BARRE CTA MOBILE — collante */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 px-4 py-3 flex items-center gap-4">
        <div className="flex-1">
          <div className="text-white font-bold text-sm">Devis en 30 secondes</div>
          <div className="text-gray-400 text-xs">Sans engagement</div>
        </div>
        <Link
          href="/reserver"
          className="bg-[#1A00CC] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#1200A0] transition-colors"
        >
          Démarrer →
        </Link>
      </div>

    </main>
  );
}
