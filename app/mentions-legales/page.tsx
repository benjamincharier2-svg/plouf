import Header from "@/components/Header";

export const metadata = {
  title: "Mentions légales & CGV — Plouf Piscines",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto prose prose-gray">

          <h1 className="text-3xl font-bold text-gray-900 mb-10">
            Mentions légales & Conditions Générales de Vente
          </h1>

          {/* Mentions légales */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Mentions légales</h2>
            <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-700 space-y-2">
              <p><strong>Raison sociale :</strong> INTENDANCE</p>
              <p><strong>Forme juridique :</strong> SAS (Société par actions simplifiée)</p>
              <p><strong>Capital social :</strong> 50 000,00 €</p>
              <p><strong>SIREN :</strong> 102 221 744</p>
              <p><strong>SIRET (siège) :</strong> 102 221 744 00018</p>
              <p><strong>N° TVA intracommunautaire :</strong> FR35102221744</p>
              <p><strong>RCS :</strong> 102 221 744 R.C.S. Bordeaux</p>
              <p><strong>Siège social :</strong> 15 rue Thiac, 33000 Bordeaux</p>
              <p><strong>Dirigeants :</strong> Bastien Beaubat, Alexandre Viallet</p>
              <p><strong>Email :</strong> contact@ploufpiscines.fr</p>
              <p><strong>Hébergeur :</strong> Vercel Inc. — 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
            </div>
          </section>

          {/* CGV */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Conditions Générales de Vente</h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2.1 Objet</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles
              entre Plouf Piscines (ci-après « Prestataire ») et toute personne physique passant
              commande via le site ploufpiscines.fr (ci-après « Client »).
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2.2 Services proposés</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Plouf Piscines propose des abonnements d'entretien de piscine à domicile couvrant la
              saison de mai à octobre, ainsi que des interventions ponctuelles (remise en route,
              hivernage, traitement choc, dépannage).
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2.3 Tarifs</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Les tarifs affichés sur le site sont en euros TTC. Plouf Piscines se réserve le droit
              de modifier ses tarifs à tout moment. Les tarifs en vigueur sont ceux affichés au
              moment de la commande.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2.4 Processus de réservation et paiement</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              La réservation d'un abonnement s'effectue en plusieurs étapes :
            </p>
            <ol className="text-gray-600 text-sm leading-relaxed list-decimal list-inside mt-2 space-y-1">
              <li>Le Client configure son abonnement et choisit un créneau de première intervention.</li>
              <li>Le Client renseigne ses coordonnées et valide le récapitulatif.</li>
              <li>Un acompte correspondant à 50 % du montant saisonnier est pré-autorisé sur la carte bancaire du Client. Aucun débit n'est effectué à ce stade.</li>
              <li>Plouf Piscines valide la réservation et envoie un lien de paiement au Client.</li>
              <li>Le Client confirme le paiement en cliquant sur le lien reçu par email.</li>
              <li>Le montant est débité après confirmation de la première intervention.</li>
            </ol>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2.5 Politique d'annulation</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Le Client peut annuler sa réservation à tout moment via le lien d'annulation reçu par email.
            </p>
            <ul className="text-gray-600 text-sm leading-relaxed list-disc list-inside mt-2 space-y-1">
              <li><strong>Annulation plus de 24h avant l'intervention :</strong> aucune pénalité, la pré-autorisation est annulée.</li>
              <li><strong>Annulation moins de 24h avant l'intervention :</strong> des frais d'annulation correspondant à 25 % du montant mensuel seront prélevés.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2.6 Zone géographique</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Les services de Plouf Piscines sont disponibles sur Bordeaux Métropole et le secteur
              Médoc — Bassin d'Arcachon. Toute commande hors zone sera annulée et la pré-autorisation
              levée sans frais.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2.7 Droit de rétractation</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation
              ne peut pas être exercé pour les contrats de services dont l'exécution a commencé avant
              la fin du délai de rétractation, avec l'accord exprès du consommateur.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2.8 Responsabilité</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Plouf Piscines s'engage à fournir les services décrits avec le soin requis par un
              professionnel du secteur. La responsabilité du Prestataire ne saurait être engagée en
              cas de force majeure, conditions climatiques exceptionnelles ou défaillances matérielles
              préexistantes non signalées par le Client.
            </p>
          </section>

          {/* RGPD */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Protection des données personnelles</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Conformément au RGPD (Règlement Général sur la Protection des Données), vous disposez
              d'un droit d'accès, de rectification et de suppression de vos données personnelles.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Les données collectées (nom, prénom, email, téléphone, adresse) sont utilisées
              uniquement pour la gestion de votre réservation et ne sont jamais revendues à des tiers.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pour exercer vos droits, contactez-nous à :{" "}
              <a href="mailto:contact@ploufpiscines.fr" className="text-[#1A00CC] underline">
                contact@ploufpiscines.fr
              </a>
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Cookies</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement
              (pas de cookies publicitaires ni de tracking tiers). Aucun consentement n'est requis
              pour ces cookies essentiels.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Contact</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pour toute question relative aux présentes CGV ou à vos données personnelles :
            </p>
            <div className="bg-[#EEE9FF] rounded-xl p-4 mt-3 text-sm">
              <p className="font-semibold text-[#1A00CC]">Plouf Piscines</p>
              <p className="text-gray-700">Email : contact@ploufpiscines.fr</p>
              <p className="text-gray-700">Site : ploufpiscines.fr</p>
            </div>
          </section>

          <p className="text-xs text-gray-400 text-center mt-12">
            Dernière mise à jour : mai 2025
          </p>

        </div>
      </main>
    </div>
  );
}
