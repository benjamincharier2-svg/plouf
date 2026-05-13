import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Réservation confirmée — Plouf Piscines",
};

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/">
            <Image src="/logo-bleu.png" alt="plouf!" width={90} height={40} className="object-contain" />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">

          {/* Icône succès */}
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Paiement confirmé !
          </h1>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Votre abonnement Plouf est activé. Nous vous contacterons très prochainement
            pour confirmer les détails de votre première intervention.
          </p>

          {/* Récap étapes */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-4">
            <h2 className="font-semibold text-gray-800 mb-3">Et maintenant ?</h2>
            {[
              {
                step: "1",
                title: "Email de confirmation",
                desc: "Un récapitulatif complet vous a été envoyé par email.",
              },
              {
                step: "2",
                title: "Notre équipe vous appelle",
                desc: "Nous confirmons votre premier créneau dans les 24h.",
              },
              {
                step: "3",
                title: "Premier passage",
                desc: "Le technicien arrive à l'heure prévue. Vous n'avez rien à faire.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#1A00CC] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{item.title}</div>
                  <div className="text-gray-500 text-sm">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="bg-[#EEE9FF] rounded-2xl p-5 mb-8">
            <p className="text-sm text-gray-600">
              Une question ? Écrivez-nous à{" "}
              <a href="mailto:contact@ploufpiscines.fr" className="text-[#1A00CC] font-medium underline">
                contact@ploufpiscines.fr
              </a>
            </p>
          </div>

          <Link
            href="/"
            className="inline-block text-[#1A00CC] font-medium hover:underline text-sm"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
