# Plouf Piscines — Documentation projet

## Contexte business

Service d'entretien de piscines à domicile sur **Bordeaux Métropole, Médoc et Bassin d'Arcachon**.
Le site est un tunnel de conversion : visiteur → demande de réservation → rappel sous 2h par l'équipe.

**Société derrière Plouf :** INTENDANCE (SAS)
- SIREN : 102 221 744
- SIRET : 102 221 744 00018
- TVA : FR35102221744
- RCS Bordeaux
- Capital : 50 000 €
- Siège : 15 rue Thiac, 33000 Bordeaux
- Dirigeants : Bastien Beaubat, Alexandre Viallet

**Contact :** contact@ploufpiscines.fr · 05 54 54 08 80

---

## Stack technique

| Couche | Techno |
|---|---|
| Frontend + API routes | Next.js 14 (App Router, TypeScript strict) |
| UI | TailwindCSS + composants custom (pas de shadcn) |
| Emails | Resend |
| Déploiement | Vercel |
| Repo GitHub | `benjamincharier2-svg/plouf` |

**MVP actuel — ce qui N'est PAS activé :**
- Supabase (pas de BDD pour l'instant)
- Stripe (pas de paiement en ligne)
- Page /eau-verte (supprimée du MVP)

---

## Identité visuelle

### Couleurs (tokens Tailwind)
| Token | Hex | Usage |
|---|---|---|
| `plouf` | `#1313D6` | Couleur principale — bleu indigo profond |
| `plouf-dark` | `#0E0EB8` | Hover boutons |
| `plouf-eau` | `#9EE6F7` | Bleu clair eau |
| `plouf-glacier` | `#C8F0F8` | Fond très clair |
| `plouf-lavande` | `#E7EBFF` | Fond sélection/badges |
| `plouf-sable` | `#FFF8E7` | Fond chaud (parrainage) |

### Typographie
- **Titres :** Poppins → classe `font-title`
- **Corps :** Inter → classe `font-sans`

### Ton éditorial
Rassurant, direct, sans jargon. Phrases courtes. Première personne du pluriel ("on vient", "on gère"). Pas de "nous" corporate. Valeurs : transparence, simplicité, résultat garanti.

---

## Structure des pages

| Route | Description | Type |
|---|---|---|
| `/` | Landing page principale | Server Component |
| `/reserver` | Wizard de réservation 4 étapes | Client Component |
| `/tarifs` | Grille abonnements + ponctuelles + comparatif | Server Component |
| `/interventions` | Liste des interventions ponctuelles avec tarifs | Server Component |
| `/conseils` | Page conseils d'entretien (SEO) | Server Component + Client FAQ |
| `/a-propos` | Histoire, zones, valeurs | Server Component |
| `/mentions-legales` | Mentions légales INTENDANCE | Server Component |
| `/faq` | FAQ générale | Server Component |

---

## Wizard de réservation (`/reserver`)

### Flow
**Intervention express :** type → etat_eau → zone → coordonnées → recap → done

**Abonnement saisonnier :** type → taille → fréquence → traitement → etat_eau → zone → coordonnées → recap → done

### Règles UX
- Une question par écran, auto-avance sur les choix uniques
- Barre de progression seule (pas de "Étape X/Y")
- "Intervention express" toujours en premier
- Bulle rassurante : prix express déduit de l'abonnement si souscription ultérieure
- Aucun paiement demandé — rappel sous 2h

### Tarifs abonnement
| Taille | 2×/mois | 4×/mois |
|---|---|---|
| Petite (< 30 m³) | 120 €/mois | 199 €/mois |
| Moyenne (30–60 m³) | 145 €/mois | 245 €/mois |
| Grande (> 60 m³) | 179 €/mois | 299 €/mois |

Sel (électrolyse) : +15% sur tous les tarifs.

### Interventions express
| Prestation | Tarif | Durée |
|---|---|---|
| Passage ponctuel | dès 75 € | ~1h |
| Nettoyage complet | 120 € | ~2h |
| Remise en route printemps | 250 € | ~3h |
| Hivernage complet | 290 € | ~2h |
| Changement sable filtre | 220 € | ~2h |
| Eau verte | dès 150 € | 2 visites |

---

## Zones d'intervention
- **Bordeaux Métropole** : Bordeaux, Mérignac, Bruges, Le Bouscat, Eysines, Pessac…
- **Médoc** : Soulac-sur-Mer, Lesparre-Médoc, Pauillac…
- **Bassin d'Arcachon** : Arcachon, La Teste-de-Buch, Andernos…

---

## API

### `POST /api/reservations`
Reçoit les données du wizard, envoie un email admin via Resend.

**Payload :**
```json
{
  "type_intervention": "unique | abonnement",
  "prenom": "string",
  "nom": "string",
  "email": "string",
  "telephone": "string",
  "adresse": "string",
  "ville": "string",
  "code_postal": "string",
  "zone": "bordeaux_metropole | medoc_bassin",
  "etat_eau": "claire | trouble | verte | je_sais_pas",
  "taille_bassin": "petit | moyen | grand",
  "type_traitement": "chlore | sel",
  "frequence": "bimensuel | hebdomadaire",
  "montant_mensuel": 145,
  "notes": "string | null"
}
```

---

## Emails (Resend)

**Clé API :** configurée en variable d'environnement Vercel (`RESEND_API_KEY`)
**Expéditeur actuel :** `onboarding@resend.dev` (sandbox — en attente vérification domaine)
**Destinataire admin :** `contact@ploufpiscines.fr` (`ADMIN_EMAIL`)

**⏳ En attente :** vérification DNS du domaine `ploufpiscines.fr` sur Resend pour passer l'expéditeur à `reservations@ploufpiscines.fr`

### Entrées DNS Resend à ajouter sur IONOS
| Type | Nom | Valeur |
|---|---|---|
| TXT | `resend._domainkey` | *(valeur DKIM depuis resend.com/domains)* |
| MX | `send` | *(valeur depuis resend.com/domains)* |
| TXT | `send` | `v=spf1 include:…~all` |
| TXT | `_dmarc` | `v=DMARC1; p=none;` |

---

## Déploiement

**Vercel :** projet `plouf` connecté au repo GitHub `benjamincharier2-svg/plouf`
**URL actuelle :** `plouf.vercel.app` ✅
**URL finale :** `ploufpiscines.fr` ⏳ (en attente DNS IONOS)

### Variables d'environnement Vercel
| Variable | Valeur |
|---|---|
| `RESEND_API_KEY` | `re_84axeQJ3_…` |
| `ADMIN_EMAIL` | `contact@ploufpiscines.fr` |
| `NEXT_PUBLIC_APP_URL` | `https://ploufpiscines.fr` |

### Entrées DNS Vercel à ajouter sur IONOS
| Type | Nom | Valeur |
|---|---|---|
| A | `@` | `216.198.79.1` |
| CNAME | `www` | `00897f53cf4e4f73.vercel-dns-017.com.` |

---

## Assets publics (`/public`)

| Fichier | Usage |
|---|---|
| `hero.jpg` | Photo principale (hero, cartes abonnement, headers pages) |
| `technicien-action.jpg` | Photo technicien (section "Plouf c'est quoi", hero conseils) |
| `logo-bleu.png` | Logo header (fond blanc) |
| `logo-blanc.png` | Logo footer (fond sombre) |
| `logo-transparent.png` | Logo fond transparent |
| `avis-marie.jpg` | Avatar avis client (72×72) |
| `avis-thomas.jpg` | Avatar avis client (72×72) |
| `avis-sophie.jpg` | Avatar avis client (72×72) |
| `avant-1/2.jpg` | Photos avant/après carousel |
| `apres-1/2.jpg` | Photos avant/après carousel |

---

## Composants custom

| Composant | Type | Description |
|---|---|---|
| `FaqAccordion` | Client | FAQ générale homepage (6 questions) |
| `ConseilsFaq` | Client | FAQ technique page conseils (6 questions) |
| `AvantApresCarousel` | Client | Carousel photos avant/après |

---

## Ce qui reste à faire (post-MVP)

- [ ] Vérification DNS Resend → expéditeur `@ploufpiscines.fr`
- [ ] Branchement domaine `ploufpiscines.fr` sur Vercel (DNS IONOS)
- [ ] Supabase : créer la table `reservations` pour stocker les demandes
- [ ] Page admin simple pour voir les réservations
- [ ] Stripe : paiement en ligne (quand le business est lancé)
- [ ] Photos réelles à remplacer (actuellement placeholders)
- [ ] Avis clients réels (actuellement fictifs)
- [ ] Google Analytics / Vercel Analytics
