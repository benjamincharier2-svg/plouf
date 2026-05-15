-- Migration 001 — Plouf Piscines
-- Table des réservations (abonnements + interventions uniques)

CREATE TABLE IF NOT EXISTS reservations (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at                TIMESTAMPTZ DEFAULT now(),

  -- Statut du cycle de vie
  statut                    TEXT NOT NULL DEFAULT 'en_attente'
                            CHECK (statut IN ('en_attente','validé','confirmé','payé','annulé')),

  -- Type d'intervention
  type_intervention         TEXT NOT NULL DEFAULT 'abonnement'
                            CHECK (type_intervention IN ('abonnement','unique')),

  -- Infos client
  prenom                    TEXT NOT NULL,
  nom                       TEXT NOT NULL,
  email                     TEXT NOT NULL,
  telephone                 TEXT NOT NULL,
  adresse                   TEXT NOT NULL,
  ville                     TEXT NOT NULL,
  code_postal               TEXT NOT NULL,
  notes                     TEXT,

  -- Infos intervention (nullable pour les interventions uniques)
  zone                      TEXT NOT NULL CHECK (zone IN ('bordeaux_metropole','medoc_bassin')),
  taille_bassin             TEXT CHECK (taille_bassin IN ('petit','moyen','grand')),
  type_traitement           TEXT DEFAULT 'chlore' CHECK (type_traitement IN ('chlore','sel')),
  etat_eau                  TEXT DEFAULT 'claire',
  frequence                 TEXT CHECK (frequence IN ('bimensuel','hebdomadaire')),
  montant_mensuel           DECIMAL(10,2),
  creneau_date              DATE NOT NULL,
  creneau_heure             TEXT NOT NULL,

  -- Stripe
  stripe_payment_intent_id  TEXT,

  -- Tokens sécurisés pour liens email
  token_validation          UUID DEFAULT gen_random_uuid(),
  token_annulation          UUID DEFAULT gen_random_uuid(),

  -- Timestamps
  validé_at                 TIMESTAMPTZ,
  confirmé_at               TIMESTAMPTZ,
  payé_at                   TIMESTAMPTZ,
  annulé_at                 TIMESTAMPTZ
);

-- Index pour les recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_reservations_statut ON reservations(statut);
CREATE INDEX IF NOT EXISTS idx_reservations_email ON reservations(email);
CREATE INDEX IF NOT EXISTS idx_reservations_token_validation ON reservations(token_validation);
CREATE INDEX IF NOT EXISTS idx_reservations_token_annulation ON reservations(token_annulation);

-- Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Seul le service role peut tout lire/modifier (API routes)
CREATE POLICY "Service role full access" ON reservations
  FOR ALL USING (true) WITH CHECK (true);
