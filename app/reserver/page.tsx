"use client"

import { useState } from "react"
import Link from "next/link"

// ─── Grille tarifaire ────────────────────────────────────────────────────────

const TARIFS: Record<string, Record<string, number>> = {
  petit:  { bimensuel: 120, hebdomadaire: 199 },
  moyen:  { bimensuel: 145, hebdomadaire: 245 },
  grand:  { bimensuel: 179, hebdomadaire: 299 },
}

function getPrix(taille: string, frequence: string, traitement: string): number {
  const base = TARIFS[taille]?.[frequence] ?? 0
  return traitement === "sel" ? Math.round(base * 1.15) : base
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Etape = "configurateur" | "eau-verte" | "creneau" | "coordonnees" | "recapitulatif"

interface FormData {
  taille: string
  frequence: string
  traitement: string
  etat_eau: string
  zone: string
  creneau_date: string
  creneau_heure: string
  prenom: string
  nom: string
  email: string
  telephone: string
  adresse: string
  ville: string
  code_postal: string
  notes: string
}

// ─── Créneaux disponibles par zone ───────────────────────────────────────────

const CRENEAUX_BORDEAUX = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]
const CRENEAUX_MEDOC = ["Lundi", "Vendredi"]
const HEURES = ["08h00", "09h00", "10h00", "11h00", "14h00", "15h00", "16h00"]

// ─── Composant principal ─────────────────────────────────────────────────────

export default function ReserverPage() {
  const [etape, setEtape] = useState<Etape>("configurateur")
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState("")

  const [form, setForm] = useState<FormData>({
    taille: "",
    frequence: "",
    traitement: "chlore",
    etat_eau: "claire",
    zone: "",
    creneau_date: "",
    creneau_heure: "",
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    ville: "",
    code_postal: "",
    notes: "",
  })

  const prix = form.taille && form.frequence
    ? getPrix(form.taille, form.frequence, form.traitement)
    : null

  const acompte = prix ? Math.round(prix * 6 * 0.5) : null

  function update(champ: keyof FormData, valeur: string) {
    setForm(prev => ({ ...prev, [champ]: valeur }))
  }

  async function soumettre() {
    setLoading(true)
    setErreur("")
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, montant_mensuel: prix }),
      })
      if (!res.ok) throw new Error("Erreur serveur")
      setEtape("recapitulatif")
    } catch {
      setErreur("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  // ── Étape 1 : Configurateur ────────────────────────────────────────────────

  if (etape === "configurateur") return (
    <PageShell titre="Configurez votre entretien" etape={1} total={4}>
      <p className="text-sm text-gray-500 -mt-6 mb-6">Le prix s&apos;affiche immédiatement. Aucun engagement à cette étape.</p>
      <div className="space-y-8">

        {/* Taille */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Taille de votre bassin</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "petit",  label: "Petite", desc: "jusqu'à 30 m³" },
              { val: "moyen",  label: "Moyenne", desc: "30 à 60 m³" },
              { val: "grand",  label: "Grande", desc: "60 m³ et +" },
            ].map(opt => (
              <OptionCard
                key={opt.val}
                selected={form.taille === opt.val}
                onClick={() => update("taille", opt.val)}
                label={opt.label}
                desc={opt.desc}
              />
            ))}
          </div>
        </div>

        {/* Fréquence */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Fréquence d&apos;entretien</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: "bimensuel",    label: "Bimensuel", desc: "2 passages par mois" },
              { val: "hebdomadaire", label: "Hebdomadaire ⭐", desc: "4 passages par mois — recommandé" },
            ].map(opt => (
              <OptionCard
                key={opt.val}
                selected={form.frequence === opt.val}
                onClick={() => update("frequence", opt.val)}
                label={opt.label}
                desc={opt.desc}
              />
            ))}
          </div>
        </div>

        {/* Traitement */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Type de traitement</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: "chlore", label: "Chlore", desc: "Traitement classique" },
              { val: "sel",    label: "Sel (électrolyse)", desc: "Supplément +15%" },
            ].map(opt => (
              <OptionCard
                key={opt.val}
                selected={form.traitement === opt.val}
                onClick={() => update("traitement", opt.val)}
                label={opt.label}
                desc={opt.desc}
              />
            ))}
          </div>
        </div>

        {/* État de l'eau */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">État actuel de votre eau</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: "claire",       label: "Claire", desc: "Eau propre et transparente" },
              { val: "trouble",      label: "Trouble", desc: "Eau un peu voilée" },
              { val: "verte",        label: "Verte ⚠️", desc: "Eau verte ou opaque", warning: true },
              { val: "je_sais_pas",  label: "Je ne sais pas", desc: "On évalue ensemble" },
            ].map(opt => (
              <OptionCard
                key={opt.val}
                selected={form.etat_eau === opt.val}
                onClick={() => update("etat_eau", opt.val)}
                label={opt.label}
                desc={opt.desc}
                warning={opt.warning}
              />
            ))}
          </div>
          {form.etat_eau === "trouble" && (
            <p className="mt-3 text-sm text-[#1A00CC] bg-[#EEE9FF] px-4 py-2.5 rounded-lg">
              ✓ Le premier passage correctif est inclus dans votre abonnement.
            </p>
          )}
          {form.etat_eau === "je_sais_pas" && (
            <p className="mt-3 text-sm text-gray-600 bg-gray-50 px-4 py-2.5 rounded-lg">
              Pas de problème — notre technicien évaluera l&apos;état de l&apos;eau lors du premier passage.
            </p>
          )}
        </div>

        {/* Prix affiché */}
        {prix && (
          <div className="bg-[#1A00CC] text-white rounded-2xl p-6 text-center">
            <p className="text-white/70 text-sm mb-1">Votre tarif</p>
            <p className="text-5xl font-bold font-serif mb-1">{prix} €<span className="text-2xl font-normal">/mois</span></p>
            <p className="text-white/70 text-sm">Produits inclus · Saison mai–octobre · Paiement après chaque passage</p>
          </div>
        )}

        <button
          onClick={() => form.etat_eau === "verte" ? setEtape("eau-verte") : setEtape("creneau")}
          disabled={!form.taille || !form.frequence}
          className="w-full bg-[#1A00CC] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#1200A0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {form.etat_eau === "verte" ? "Demander un devis eau verte →" : "Choisir mon créneau →"}
        </button>

        {!form.taille || !form.frequence ? (
          <p className="text-center text-sm text-gray-400">Sélectionnez une taille et une fréquence pour continuer</p>
        ) : null}

      </div>
    </PageShell>
  )

  // ── Étape eau verte ────────────────────────────────────────────────────────

  if (etape === "eau-verte") return (
    <PageShell titre="Rattrapage eau verte" etape={null} total={null}>
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
          <p className="font-semibold text-yellow-800 mb-2">⚠️ Votre piscine nécessite un rattrapage</p>
          <p className="text-yellow-700 text-sm">Avant de souscrire un abonnement, votre eau doit être traitée. Notre équipe vous contacte pour évaluer la situation et vous proposer un devis.</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Votre nom *</label>
            <input
              type="text"
              placeholder="Prénom Nom"
              value={`${form.prenom} ${form.nom}`.trim()}
              onChange={e => {
                const [p, ...rest] = e.target.value.split(" ")
                update("prenom", p)
                update("nom", rest.join(" "))
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A00CC]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Votre email *</label>
            <input
              type="email"
              placeholder="vous@exemple.fr"
              value={form.email}
              onChange={e => update("email", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A00CC]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Votre téléphone *</label>
            <input
              type="tel"
              placeholder="06 XX XX XX XX"
              value={form.telephone}
              onChange={e => update("telephone", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A00CC]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Décrivez l&apos;état de votre piscine</label>
            <textarea
              rows={3}
              placeholder="Eau verte depuis combien de temps ? Fond visible ? Algues sur les parois ?"
              value={form.notes}
              onChange={e => update("notes", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A00CC] resize-none"
            />
          </div>
        </div>
        <button
          onClick={() => setEtape("recapitulatif")}
          disabled={!form.email || !form.telephone}
          className="w-full bg-yellow-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-yellow-600 transition-colors disabled:opacity-40"
        >
          Envoyer ma demande →
        </button>
        <button onClick={() => setEtape("configurateur")} className="w-full text-gray-500 text-sm hover:text-gray-700">
          ← Retour
        </button>
      </div>
    </PageShell>
  )

  // ── Étape 2 : Créneau ─────────────────────────────────────────────────────

  if (etape === "creneau") return (
    <PageShell titre="Quand souhaitez-vous le premier passage ?" etape={2} total={4}>
      <div className="space-y-6">

        {/* Zone */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Votre secteur</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: "bordeaux_metropole", label: "Bordeaux Métropole", desc: "Mardi, Mercredi ou Jeudi" },
              { val: "medoc_bassin",       label: "Médoc & Bassin d'Arcachon", desc: "Lundi ou Vendredi" },
            ].map(opt => (
              <OptionCard
                key={opt.val}
                selected={form.zone === opt.val}
                onClick={() => { update("zone", opt.val); update("creneau_date", "") }}
                label={opt.label}
                desc={opt.desc}
              />
            ))}
          </div>
        </div>

        {/* Jour */}
        {form.zone && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Jour préféré</h3>
            <div className="flex flex-wrap gap-2">
              {(form.zone === "bordeaux_metropole" ? CRENEAUX_BORDEAUX : CRENEAUX_MEDOC).map(jour => (
                <button
                  key={jour}
                  onClick={() => update("creneau_date", jour)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    form.creneau_date === jour
                      ? "bg-[#1A00CC] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {jour}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Heure */}
        {form.creneau_date && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Créneau horaire</h3>
            <div className="flex flex-wrap gap-2">
              {HEURES.map(h => (
                <button
                  key={h}
                  onClick={() => update("creneau_heure", h)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    form.creneau_heure === h
                      ? "bg-[#1A00CC] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={() => setEtape("configurateur")} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            ← Retour
          </button>
          <button
            onClick={() => setEtape("coordonnees")}
            disabled={!form.zone || !form.creneau_date || !form.creneau_heure}
            className="flex-1 bg-[#1A00CC] text-white py-3 rounded-xl font-semibold hover:bg-[#1200A0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continuer →
          </button>
        </div>
      </div>
    </PageShell>
  )

  // ── Étape 3 : Coordonnées ─────────────────────────────────────────────────

  if (etape === "coordonnees") return (
    <PageShell titre="Où doit venir le technicien ?" etape={3} total={4}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
            <input type="text" value={form.prenom} onChange={e => update("prenom", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A00CC]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
            <input type="text" value={form.nom} onChange={e => update("nom", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A00CC]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A00CC]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
          <input type="tel" value={form.telephone} onChange={e => update("telephone", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A00CC]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse de la piscine *</label>
          <input type="text" value={form.adresse} onChange={e => update("adresse", e.target.value)}
            placeholder="15 rue des Roses"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A00CC]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code postal *</label>
            <input type="text" value={form.code_postal} onChange={e => update("code_postal", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A00CC]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
            <input type="text" value={form.ville} onChange={e => update("ville", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A00CC]" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optionnel)</label>
          <textarea rows={2} value={form.notes} onChange={e => update("notes", e.target.value)}
            placeholder="Code d'accès, informations utiles..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A00CC] resize-none" />
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={() => setEtape("creneau")} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            ← Retour
          </button>
          <button
            onClick={() => setEtape("recapitulatif")}
            disabled={!form.prenom || !form.nom || !form.email || !form.telephone || !form.adresse || !form.ville || !form.code_postal}
            className="flex-1 bg-[#1A00CC] text-white py-3 rounded-xl font-semibold hover:bg-[#1200A0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Voir le récapitulatif →
          </button>
        </div>
      </div>
    </PageShell>
  )

  // ── Étape 4 : Récapitulatif ───────────────────────────────────────────────

  if (etape === "recapitulatif") return (
    <PageShell titre="Récapitulatif" etape={4} total={4}>
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-2xl p-5 space-y-3 text-sm">
          <LigneRecap label="Taille bassin" valeur={form.taille ? { petit: "Petite piscine", moyen: "Piscine moyenne", grand: "Grande piscine" }[form.taille] ?? "" : ""} />
          <LigneRecap label="Fréquence" valeur={form.frequence === "hebdomadaire" ? "Hebdomadaire (4x/mois)" : "Bimensuel (2x/mois)"} />
          <LigneRecap label="Traitement" valeur={form.traitement === "sel" ? "Sel (électrolyse)" : "Chlore"} />
          <LigneRecap label="Zone" valeur={form.zone === "bordeaux_metropole" ? "Bordeaux Métropole" : "Médoc / Bassin"} />
          <LigneRecap label="Créneau" valeur={`${form.creneau_date} à ${form.creneau_heure}`} />
          <LigneRecap label="Adresse" valeur={`${form.adresse}, ${form.code_postal} ${form.ville}`} />
          <div className="border-t pt-3">
            <LigneRecap label="Tarif mensuel" valeur={`${prix} €/mois`} bold />
          </div>
        </div>

        {acompte && (
          <div className="bg-[#EEE9FF] border border-plouf/30 rounded-xl p-4 text-sm text-plouf-dark">
            <p className="font-semibold mb-1">💳 Acompte de souscription : {acompte} €</p>
            <p className="text-[#1A00CC]">Représente 50% du total saison ({prix! * 6} €). Le reste sera réglé en août (25%) et octobre (25%). Votre carte n&apos;est pas débitée maintenant.</p>
          </div>
        )}

        {erreur && (
          <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">{erreur}</p>
        )}

        <button
          onClick={soumettre}
          disabled={loading}
          className="w-full bg-[#1A00CC] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#1200A0] transition-colors disabled:opacity-60"
        >
          {loading ? "Envoi en cours..." : "Envoyer ma demande →"}
        </button>

        <p className="text-xs text-center text-gray-400">
          Aucun paiement aujourd&apos;hui. Vous recevez une confirmation sous 20 minutes. Le premier débit a lieu après le premier passage.{" "}
          <Link href="/mentions-legales" className="underline hover:text-gray-600">CGV</Link>
        </p>

        <button onClick={() => setEtape("coordonnees")} className="w-full text-gray-500 text-sm hover:text-gray-700">
          ← Modifier mes informations
        </button>
      </div>
    </PageShell>
  )

  return null
}

// ─── Composants UI locaux ─────────────────────────────────────────────────────

function PageShell({ titre, etape, total, children }: {
  titre: string
  etape: number | null
  total: number | null
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 h-16 flex items-center">
        <Link href="/" className="font-serif text-xl font-bold text-[#1A00CC]">Plouf</Link>
        {etape && total && (
          <span className="ml-auto text-sm text-gray-400">Étape {etape}/{total}</span>
        )}
      </header>
      <div className="max-w-xl mx-auto px-6 py-10">
        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-8">{titre}</h1>
        {children}
      </div>
    </div>
  )
}

function OptionCard({ selected, onClick, label, desc, warning }: {
  selected: boolean
  onClick: () => void
  label: string
  desc: string
  warning?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-4 rounded-xl border-2 transition-all ${
        selected
          ? warning ? "border-yellow-400 bg-yellow-50" : "border-[#1A00CC] bg-[#EEE9FF]"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <p className={`font-semibold text-sm ${selected ? warning ? "text-yellow-700" : "text-[#1A00CC]" : "text-gray-800"}`}>
        {label}
      </p>
      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
    </button>
  )
}

function LigneRecap({ label, valeur, bold }: { label: string; valeur: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className={bold ? "font-bold text-[#1A00CC]" : "font-medium text-gray-800"}>{valeur}</span>
    </div>
  )
}
