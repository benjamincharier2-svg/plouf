import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image src="/logo-bleu.png" alt="Plouf!" width={90} height={40} className="object-contain" />
          <Link
            href="/reserver"
            className="bg-[#1A00CC] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#1200A0] transition-colors"
          >
            Réserver une intervention
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[#EEE9FF] to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-[#1A00CC]/10 text-[#1A00CC] text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            🏊 Bordeaux Métropole & Médoc · Bassin d&apos;Arcachon
          </div>
          <h1 className="font-serif text-5xl font-bold text-gray-900 leading-tight mb-4">
            Votre piscine propre tout l&apos;été.<br />
            <span className="text-[#1A00CC]">Sans y penser.</span>
          </h1>
          <p className="text-2xl font-semibold text-[#1A00CC] mb-6 tracking-tight">Plongez, on gère.</p>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Plouf est un service d&apos;entretien de piscines à domicile. Un technicien vient chez vous, traite votre eau, nettoie votre bassin — et vous envoie le rapport sur WhatsApp. Vous ne faites rien.
          </p>
          <Link
            href="/reserver"
            className="inline-block bg-[#1A00CC] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#1200A0] transition-colors shadow-lg shadow-[#1A00CC]/20"
          >
            Obtenir mon devis en 30 secondes →
          </Link>
          <p className="text-sm text-gray-400 mt-4">Dès 120€/mois · Produits inclus · Paiement après intervention</p>
        </div>
      </section>

      {/* CE QU'ON FAIT CONCRÈTEMENT */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
            Plouf, c&apos;est quoi exactement ?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Vous avez une piscine. Vous n&apos;avez pas le temps — ou l&apos;envie — de vous en occuper.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Un technicien Plouf passe chez vous selon le planning choisi. Il mesure le pH, ajoute les produits nécessaires, nettoie le bassin. Avant de partir, il vous envoie un message WhatsApp avec les photos et les mesures. Votre carte est débitée après le passage. Pas avant.
          </p>
          <p className="text-lg text-gray-700 font-semibold">
            C&apos;est tout. Vous n&apos;avez rien d&apos;autre à faire.
          </p>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="comment-ca-marche" className="py-20 px-6 bg-[#EEE9FF]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center text-gray-900 mb-4">
            3 étapes, zéro appel téléphonique
          </h2>
          <p className="text-center text-gray-500 mb-16">De la configuration à l&apos;intervention, tout se passe en ligne</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "①",
                titre: "Configurez en ligne",
                desc: "Indiquez la taille de votre bassin et la fréquence souhaitée. Le prix s'affiche immédiatement — sans devis à attendre, sans commercial à rappeler."
              },
              {
                num: "②",
                titre: "Choisissez votre créneau",
                desc: "Sélectionnez le jour et l'heure qui vous conviennent. On confirme votre réservation sous 20 minutes par SMS ou WhatsApp."
              },
              {
                num: "③",
                titre: "On vient, on s'occupe de tout",
                desc: "Le technicien intervient à l'adresse indiquée. Il traite l'eau, nettoie le bassin, documente son passage. Vous recevez le rapport. Vous payez après."
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8">
                <div className="text-3xl font-bold text-[#1A00CC] mb-4">{item.num}</div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3">{item.titre}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center text-gray-900 mb-4">
            Des tarifs clairs. Tout est inclus.
          </h2>
          <p className="text-center text-gray-500 mb-16">Deux façons de travailler avec Plouf</p>

          {/* Abonnement */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#1A00CC] text-white text-xs font-bold px-3 py-1 rounded-full">Option 1</span>
              <h3 className="font-serif text-xl font-semibold text-gray-900">Abonnement saisonnier <span className="text-gray-400 font-normal text-base">mai à octobre</span></h3>
            </div>
            <p className="text-gray-600 mb-6">Le technicien passe régulièrement, selon la fréquence choisie. C&apos;est la formule la plus économique sur la durée — et la plus pratique : plus besoin d&apos;y penser jusqu&apos;en octobre.</p>

            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-3 bg-[#1A00CC] text-white text-sm font-semibold">
                <div className="p-4"></div>
                <div className="p-4 text-center">Bimensuel<br /><span className="font-normal text-xs opacity-75">2 passages/mois</span></div>
                <div className="p-4 text-center">Hebdomadaire ⭐<br /><span className="font-normal text-xs opacity-75">4 passages/mois</span></div>
              </div>
              {[
                { label: "Petite piscine", sub: "jusqu'à 30 m³", bimensuel: 120, hebdo: 199 },
                { label: "Moyenne piscine", sub: "30 à 60 m³", bimensuel: 145, hebdo: 245 },
                { label: "Grande piscine", sub: "60 m³ et +", bimensuel: 179, hebdo: 299 },
              ].map((row, i) => (
                <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <div className="p-4">
                    <p className="font-medium text-gray-800 text-sm">{row.label}</p>
                    <p className="text-gray-400 text-xs">{row.sub}</p>
                  </div>
                  <div className="p-4 text-center text-gray-600 text-sm">{row.bimensuel}€<span className="text-gray-400">/mois</span></div>
                  <div className="p-4 text-center font-semibold text-[#1A00CC] text-sm">{row.hebdo}€<span className="text-gray-400 font-normal">/mois</span></div>
                </div>
              ))}
              <div className="p-3 bg-[#EEE9FF] text-center text-xs text-[#1A00CC] font-medium">
                Traitement au sel (électrolyse) : +15% · Option hiver : 79€/mois (novembre–avril)
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "✓ Produits de traitement fournis",
                "✓ Nettoyage du bassin",
                "✓ Mesure pH avant et après",
                "✓ Rapport WhatsApp avec photos",
                "✓ Alerte si anomalie détectée",
                "✓ Même technicien à chaque visite",
              ].map(item => (
                <div key={item} className="text-sm text-gray-600 bg-gray-50 rounded-xl py-2.5 px-3 border border-gray-100">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Ponctuel */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">Option 2</span>
              <h3 className="font-serif text-xl font-semibold text-gray-900">Intervention ponctuelle <span className="text-gray-400 font-normal text-base">sans abonnement</span></h3>
            </div>
            <p className="text-gray-600 mb-6">Vous avez besoin d&apos;un passage unique — avant une arrivée de locataires, après une absence, ou parce que l&apos;eau est devenue trouble. Les tarifs sont fixes et annoncés avant le passage.</p>

            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              {[
                { label: "Passage ponctuel", desc: "Traitement eau + nettoyage bassin", tarif: "À partir de 75€" },
                { label: "Nettoyage complet", desc: "Fond, parois, skimmers, filtration", tarif: "120€" },
                { label: "Remise en route printemps", desc: "Déshivernage, équilibrage eau, vérification filtre", tarif: "250€" },
                { label: "Hivernage complet", desc: "Produits d'hivernage, protection, mise en veille", tarif: "290€" },
                { label: "Changement sable filtre", desc: "Vidange + remplacement sable + remise en route", tarif: "220€" },
                { label: "Traitement eau verte", desc: "Diagnostic + traitement choc + suivi", tarif: "À partir de 150€" },
              ].map((row, i) => (
                <div key={i} className={`flex items-center justify-between px-5 py-4 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{row.label}</p>
                    <p className="text-gray-400 text-xs">{row.desc}</p>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm whitespace-nowrap ml-4">{row.tarif}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Tous les tarifs incluent le déplacement et les produits.</p>

            <div className="mt-6 text-center">
              <Link
                href="/interventions"
                className="inline-block border-2 border-[#1A00CC] text-[#1A00CC] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#EEE9FF] transition-colors"
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
          <h2 className="font-serif text-3xl font-bold text-center text-gray-900 mb-16">
            Ce qu&apos;on s&apos;engage à tenir
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "💳",
                titre: "Vous payez après, pas avant",
                desc: "Le paiement est déclenché après le passage du technicien. Si personne ne vient, vous n'êtes pas débité."
              },
              {
                icon: "⏱️",
                titre: "Réponse sous 20 minutes",
                desc: "Vous réservez en ligne. On confirme votre créneau par SMS sous 20 minutes, même le week-end."
              },
              {
                icon: "📋",
                titre: "Un rapport après chaque passage",
                desc: "Photos du bassin, pH avant et après, commentaire si quelque chose mérite votre attention. Sur WhatsApp."
              },
              {
                icon: "🔄",
                titre: "Annulation sans frais",
                desc: "Annulez ou reportez n'importe quel passage jusqu'à 24h avant, sans frais et sans justification."
              },
              {
                icon: "📍",
                titre: "On connaît votre secteur",
                desc: "Bordeaux Métropole en milieu de semaine. Médoc et Bassin en début et fin de semaine. Des équipes dédiées par zone."
              },
              {
                icon: "👤",
                titre: "Même technicien à chaque visite",
                desc: "Votre technicien connaît votre piscine, votre installation, vos habitudes. Pas de nouveau visage à chaque fois."
              },
            ].map((item) => (
              <div key={item.titre} className="flex flex-col gap-3 p-6 bg-white rounded-2xl border border-gray-100">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-semibold text-gray-900">{item.titre}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center text-gray-900 mb-16">
            Ils ont testé Plouf
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                avis: "J'ai réservé depuis mon bureau un mardi. Le mercredi, la piscine était traitée. Le jeudi, j'avais les photos sur WhatsApp. Impeccable.",
                nom: "Marie L.", lieu: "Mérignac"
              },
              {
                avis: "Le fait de payer après le passage m'a convaincu d'essayer. Maintenant j'ai pris l'abonnement pour toute la saison.",
                nom: "Thomas D.", lieu: "Le Bouscat"
              },
              {
                avis: "Résidence secondaire au Médoc — je n'y suis pas souvent. Plouf passe, je reçois les photos, je sais que tout est en ordre.",
                nom: "Sophie R.", lieu: "Pauillac"
              },
            ].map((item) => (
              <div key={item.nom} className="p-6 bg-gray-50 rounded-2xl">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">&ldquo;{item.avis}&rdquo;</p>
                <p className="font-semibold text-gray-900 text-sm">{item.nom}</p>
                <p className="text-gray-400 text-xs">{item.lieu}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EAU VERTE */}
      <section className="py-20 px-6 bg-[#EEE9FF]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-10 text-center">
            <span className="text-5xl mb-6 block">🟢</span>
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
              Votre eau est verte ?
            </h2>
            <h3 className="text-xl font-semibold text-[#1A00CC] mb-6">Ça arrive. On règle ça.</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Une piscine laissée sans traitement quelques semaines devient verte. Ce n&apos;est pas irrémédiable — mais ça ne se règle pas avec un bidon de chlore du supermarché.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Envoyez-nous une photo. On vous rappelle sous 2h avec un devis.
            </p>
            <Link
              href="/eau-verte"
              className="inline-block bg-[#1A00CC] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1200A0] transition-colors"
            >
              Envoyer une photo, être rappelé sous 2h →
            </Link>
            <p className="text-gray-400 text-sm mt-3">À partir de 150€ · Diagnostic gratuit</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6 bg-[#1A00CC]">
        <div className="max-w-2xl mx-auto text-center">
          <Image src="/logo-blanc.png" alt="Plouf!" width={100} height={45} className="object-contain mx-auto mb-6" />
          <h2 className="font-serif text-4xl font-bold text-white mb-3">
            Prêt à profiter de votre piscine ?
          </h2>
          <p className="text-xl text-white/80 mb-2">Plongez, on gère.</p>
          <p className="text-white/50 text-sm mb-8">Sans engagement · Réponse sous 20 min · Paiement après intervention</p>
          <Link
            href="/reserver"
            className="inline-block bg-white text-[#1A00CC] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Obtenir mon devis gratuitement →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <Image src="/logo-blanc.png" alt="Plouf!" width={80} height={36} className="object-contain mb-3" />
              <p className="text-gray-400 text-sm italic mb-1">Plongez, on gère.</p>
              <p className="text-gray-500 text-xs">Entretien · Traitement · Suivi saisonnier · Mai–Octobre</p>
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-3">Zones d&apos;intervention</p>
              <p className="text-gray-400 text-sm">Bordeaux Métropole</p>
              <p className="text-gray-400 text-sm">Médoc · Bassin d&apos;Arcachon</p>
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-3">Contact</p>
              <a href="mailto:contact@ploufpiscines.fr" className="text-gray-400 text-sm hover:text-white transition-colors block mb-2">
                contact@ploufpiscines.fr
              </a>
              <div className="flex gap-4">
                <Link href="/mentions-legales" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Mentions légales</Link>
                <Link href="/mentions-legales" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">CGV</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-600 text-xs">© 2026 Plouf Piscines · ploufpiscines.fr</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
