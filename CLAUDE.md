# Plouf Piscines — Site officiel & tunnel de conversion

## Contexte projet

Plouf est un service d'entretien de piscines à domicile opérant sur Bordeaux Métropole et le Médoc/Bassin d'Arcachon. Le site permet aux propriétaires de piscine d'obtenir un devis instantané et de réserver une intervention en ligne.

## Stack technique

| Couche | Techno |
|---|---|
| Frontend + API | Next.js 14 (App Router, TypeScript) |
| UI | TailwindCSS + composants custom |
| Base de données | Supabase (EU - Ireland) |
| Paiement | Stripe (capture manuelle post-intervention) |
| Emails | Resend |
| Déploiement | Vercel |

## Identité visuelle

- **Couleur principale** : Indigo (bleu profond) — `#4F46E5`
- **Typographie** : Georgia (serif) pour les titres, system-ui pour le corps
- **Ton** : Rassurant, professionnel, simple. Pas de jargon technique.
- **Langue** : Français uniquement (MVP)

## Utilisateurs

- **Client B2C** : propriétaire de piscine, réserve sans créer de compte (guest)
- **Admin Plouf** : reçoit les notifications et gère les réservations via des liens sécurisés dans ses emails (pas de dashboard pour le MVP)

## Tunnels de conversion

### Tunnel principal — Réservation
```
/ (landing)
→ /reserver (formulaire : taille bassin + créneau + coordonnées)
→ /paiement/[id] (Stripe — pré-autorisation, encaissement après intervention)
→ /confirmation (récap + infos)
```

### Tunnel annulation
```
Email confirmation → lien /annuler/[token]
→ Si > 24h avant : annulation gratuite
→ Si < 24h avant : 25% du montant encaissé
```

## Flux de réservation (cycle de vie)

```
1. Client soumet le formulaire → statut : en_attente
2. Admin reçoit email avec bouton [Valider]
3. Admin valide → statut : validé → email client avec lien paiement
4. Client autorise paiement Stripe (capture_method: manual) → statut : confirmé
5. Intervention effectuée → admin encaisse → statut : payé
6. (Si annulation < 24h) → 25% capturé → statut : annulé
```

## Schéma base de données (Supabase)

```sql
reservations
├── id                        uuid PRIMARY KEY DEFAULT gen_random_uuid()
├── created_at                timestamp DEFAULT now()
├── statut                    text -- 'en_attente' | 'validé' | 'confirmé' | 'payé' | 'annulé'
├── prenom                    text NOT NULL
├── nom                       text NOT NULL
├── email                     text NOT NULL
├── telephone                 text NOT NULL
├── adresse                   text NOT NULL
├── ville                     text NOT NULL
├── code_postal               text NOT NULL
├── notes                     text
├── zone                      text -- 'bordeaux_metropole' | 'medoc_bassin'
├── taille_bassin             text -- 'petit' | 'moyen' | 'grand'
├── montant                   decimal(10,2) NOT NULL
├── creneau_date              date NOT NULL
├── creneau_heure             text NOT NULL
├── stripe_payment_intent_id  text
├── token_validation          uuid DEFAULT gen_random_uuid()
├── token_annulation          uuid DEFAULT gen_random_uuid()
├── validé_at                 timestamp
├── confirmé_at               timestamp
├── payé_at                   timestamp
└── annulé_at                 timestamp
```

## Routes API

```
POST /api/reservations                         → créer réservation (statut: en_attente)
GET  /api/reservations/[id]/valider?token=xxx  → admin valide + envoie lien paiement
POST /api/stripe/webhook                       → paiement autorisé → statut: confirmé
POST /api/reservations/[id]/capturer?token=xxx → admin encaisse après intervention
POST /api/reservations/[id]/annuler?token=xxx  → client annule (avec ou sans pénalité)
```

## Pages

```
/                    Landing page + proposition de valeur
/reserver            Formulaire de réservation
/paiement/[id]       Page paiement Stripe
/confirmation        Post-paiement
/annuler/[token]     Annulation client
/mentions-legales    Mentions légales + CGV
```

## Zones et communes

```
bordeaux_metropole → Bruges, Caudéran, Le Bouscat, Bordeaux, Mérignac, Eysines
medoc_bassin       → Soulac-sur-Mer, Lesparre-Médoc, Pauillac et communes côtières
```

## Tarification

⚠️ BLOQUANT — grille tarifaire non reçue, à compléter avant de coder le calculateur.

## Conventions de code

- TypeScript strict — pas de `any`
- Composants dans `components/`
- Routes API dans `app/api/`
- Variables d'env dans `.env.local` (jamais commitées)
- Server Components par défaut, Client Components uniquement si nécessaire
- Nommage : camelCase variables/fonctions, PascalCase composants

## Variables d'environnement requises

```bash
NEXT_PUBLIC_SUPABASE_URL=https://iyvruzbzdvqwncxcpkug.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
RESEND_API_KEY=...
NEXT_PUBLIC_APP_URL=https://ploufpiscines.fr
ADMIN_EMAIL=contact@ploufpiscines.fr
```

## Règles importantes

- Jamais de clés API côté client
- Stripe : toujours `capture_method: 'manual'`
- Les tokens de validation/annulation sont des UUID générés côté serveur
- Tester avec Stripe en mode test pendant le développement
- RLS Supabase activé sur la table reservations
