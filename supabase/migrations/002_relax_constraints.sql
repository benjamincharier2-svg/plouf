-- Migration 002 — Rendre creneau_date, creneau_heure et montant optionnels
-- Le tunnel actuel ne collecte pas ces champs

ALTER TABLE reservations
  ALTER COLUMN creneau_date  DROP NOT NULL,
  ALTER COLUMN creneau_heure DROP NOT NULL,
  ALTER COLUMN montant_mensuel DROP NOT NULL;

-- Ajouter colonne montant si elle n'existe pas (schema CLAUDE.md vs migration 001)
ALTER TABLE reservations
  ADD COLUMN IF NOT EXISTS montant DECIMAL(10,2);
