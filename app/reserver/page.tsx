"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"

// ─── Tarifs ──────────────────────────────────────────────────────────────────

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

type StepId =
  | "type"
  | "taille"
  | "frequence"
  | "traitement"
  | "etat_eau"
  | "zone"
  | "coordonnees"
  | "recap"
  | "done"

interface FormData {
  type_intervention: string
  taille: string
  frequence: string
  traitement: string
  etat_eau: string
  zone: string
  prenom: string
  nom: string
  email: string
  telephone: string
  adresse: string
  ville: string
  code_postal: string
  notes: string
}

const STEPS_ABO: StepId[]    = ["type", "taille", "frequence", "traitement", "etat_eau", "zone", "coordonnees", "recap"]
const STEPS_UNIQUE: StepId[] = ["type", "etat_eau", "zone", "coordonnees", "recap"]

type UpdateFn = <K extends keyof FormData>(k: K, v: FormData[K]) => void

// ─── Composant principal ─────────────────────────────────────────────────────

export default function ReserverPage() {
  const [step, setStep]       = useState<StepId>("type")
  const [dir,  setDir]        = useState<1 | -1>(1)
  const [visible, setVisible] = useState(true)
  const [loading, setLoading] = useState(false)
  const [erreur,  setErreur]  = useState("")

  const [form, setForm] = useState<FormData>({
    type_intervention: "",
    taille: "", frequence: "", traitement: "chlore", etat_eau: "",
    zone: "",
    prenom: "", nom: "", email: "", telephone: "",
    adresse: "", ville: "", code_postal: "", notes: "",
  })

  const prix = form.type_intervention === "abonnement" && form.taille && form.frequence
    ? getPrix(form.taille, form.frequence, form.traitement)
    : null

  // ── Navigation ─────────────────────────────────────────────────────────────

  const transition = useCallback((next: StepId, direction: 1 | -1 = 1) => {
    setDir(direction)
    setVisible(false)
    setTimeout(() => { setStep(next); setVisible(true) }, 180)
  }, [])

  const goNext = useCallback((s: StepId) => transition(s, 1),  [transition])
  const goBack = useCallback((s: StepId) => transition(s, -1), [transition])

  function update<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  // ── Progression ────────────────────────────────────────────────────────────

  const activeSteps = form.type_intervention === "unique" ? STEPS_UNIQUE : STEPS_ABO
  const stepIndex   = activeSteps.indexOf(step)
  const totalSteps  = activeSteps.length - 1
  const progress    = stepIndex < 0 ? 100 : Math.round((stepIndex / totalSteps) * 100)

  // ── Soumission ─────────────────────────────────────────────────────────────

  async function soumettre() {
    setLoading(true); setErreur("")
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type_intervention: form.type_intervention,
          prenom:            form.prenom,
          nom:               form.nom,
          email:             form.email,
          telephone:         form.telephone,
          adresse:           form.adresse,
          ville:             form.ville,
          code_postal:       form.code_postal,
          notes:             form.notes || null,
          zone:              form.zone,
          taille_bassin:     form.taille    || null,
          type_traitement:   form.traitement || null,
          etat_eau:          form.etat_eau   || null,
          frequence:         form.frequence  || null,
          montant_mensuel:   prix ?? null,
        }),
      })
      if (!res.ok) throw new Error()
      goNext("done")
    } catch {
      setErreur("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  // ── Animation ──────────────────────────────────────────────────────────────

  const animClass = visible
    ? "opacity-100 translate-x-0"
    : dir === 1 ? "opacity-0 -translate-x-6" : "opacity-0 translate-x-6"

  if (step === "done") return <SuccessScreen />

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #E7EBFF 0%, #D6F2F7 55%, #eaf7fb 100%)" }}
    >
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 flex-shrink-0">
        <Link href="/">
          <Image src="/logo-bleu.png" alt="plouf!" width={70} height={32} className="object-contain" />
        </Link>
        {prix && (
          <div className="bg-white/80 backdrop-blur border border-plouf/20 text-plouf font-bold text-sm px-4 py-1.5 rounded-full shadow-sm">
            {prix} €/mois
          </div>
        )}
      </header>

      {/* Barre de progression — sans texte */}
      <div className="px-6 mb-8 flex-shrink-0">
        <div className="max-w-lg mx-auto">
          <div className="h-1 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-plouf rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Carte */}
      <div className="flex-1 flex items-start justify-center px-4 pb-16">
        <div className={`w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-plouf/10 p-8 transition-all duration-180 ease-out ${animClass}`}>

          {step === "type"        && <StepType        form={form} update={update} goNext={goNext} />}
          {step === "taille"      && <StepTaille       form={form} update={update} goNext={goNext} goBack={goBack} />}
          {step === "frequence"   && <StepFrequence    form={form} update={update} goNext={goNext} goBack={goBack} />}
          {step === "traitement"  && <StepTraitement   form={form} update={update} goNext={goNext} goBack={goBack} />}
          {step === "etat_eau"    && <StepEau          form={form} update={update} goNext={goNext} goBack={goBack} />}
          {step === "zone"        && <StepZone         form={form} update={update} goNext={goNext} goBack={goBack} />}
          {step === "coordonnees" && <StepCoordonnees  form={form} update={update} goNext={goNext} goBack={goBack} />}
          {step === "recap"       && (
            <StepRecap
              form={form} prix={prix} loading={loading} erreur={erreur}
              onSubmit={soumettre}
              goBack={() => goBack("coordonnees")}
            />
          )}

        </div>
      </div>
    </div>
  )
}

// ─── Composants UI partagés ──────────────────────────────────────────────────

function Question({ children }: { children: React.ReactNode }) {
  return <h2 className="font-title font-bold text-2xl text-gray-900 mb-2 leading-snug">{children}</h2>
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-400 text-sm mb-7">{children}</p>
}

function OptionCard({
  selected, onClick, label, desc, emoji, tag, warning,
}: {
  selected: boolean; onClick: () => void; label: string
  desc?: string; emoji?: string; tag?: string; warning?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-150 ${
        selected
          ? warning
            ? "border-yellow-400 bg-yellow-50"
            : "border-plouf bg-plouf-lavande shadow-sm"
          : "border-gray-100 hover:border-plouf-glacier hover:bg-plouf-glacier/10"
      }`}
    >
      {emoji && (
        <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 ${
          selected ? (warning ? "bg-yellow-100" : "bg-plouf-lavande") : "bg-gray-50"
        }`}>{emoji}</span>
      )}
      <div className="flex-1">
        <p className={`font-semibold text-sm flex items-center gap-2 flex-wrap ${
          selected ? (warning ? "text-yellow-700" : "text-plouf") : "text-gray-800"
        }`}>
          {label}
          {tag && (
            <span className="text-xs font-normal bg-plouf text-white px-2 py-0.5 rounded-full">{tag}</span>
          )}
        </p>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
      {selected && !warning && (
        <div className="w-5 h-5 rounded-full bg-plouf flex items-center justify-center flex-shrink-0">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  )
}

function BtnNext({ onClick, disabled, children = "Continuer →" }: {
  onClick: () => void; disabled?: boolean; children?: React.ReactNode
}) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="w-full mt-6 bg-plouf text-white font-semibold py-3.5 rounded-xl hover:bg-plouf-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-base"
    >{children}</button>
  )
}

function BtnBack({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full mt-3 text-gray-400 text-sm hover:text-gray-600 transition-colors py-2">
      ← Retour
    </button>
  )
}

function Field({ label, type = "text", value, onChange, placeholder, autoFocus, required = true }: {
  label: string; type?: string; value: string; onChange: (v: string) => void
  placeholder?: string; autoFocus?: boolean; required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        {label}{required && " *"}
      </label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} autoFocus={autoFocus}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-plouf/30 focus:border-plouf transition-all text-gray-900 text-sm"
      />
    </div>
  )
}

// ─── Étape 1 — Type ───────────────────────────────────────────────────────────

function StepType({ form, update, goNext }: {
  form: FormData; update: UpdateFn; goNext: (s: StepId) => void
}) {
  function choose(val: "unique" | "abonnement", next: StepId) {
    update("type_intervention", val)
    setTimeout(() => goNext(next), 150)
  }

  return (
    <>
      <Question>Quel type d&apos;intervention cherchez-vous ?</Question>
      <Hint>Aucun paiement maintenant — on vous rappelle sous 2h.</Hint>

      <div className="space-y-3">

        {/* Express — en premier */}
        <OptionCard
          selected={form.type_intervention === "unique"}
          onClick={() => choose("unique", "etat_eau")}
          emoji="⚡"
          label="Intervention express"
          tag="dès 75€"
          desc="Remise en route, nettoyage, traitement choc, hivernage…"
        />

        {/* Abonnement */}
        <OptionCard
          selected={form.type_intervention === "abonnement"}
          onClick={() => choose("abonnement", "taille")}
          emoji="🏊"
          label="Abonnement saisonnier"
          tag="recommandé"
          desc="Mai → octobre · 2 ou 4 passages/mois · produits inclus"
        />

      </div>

      {/* Bulle rassurante */}
      <div className="mt-5 flex gap-3 bg-plouf-glacier/30 border border-plouf-glacier rounded-2xl px-4 py-3.5">
        <span className="text-lg flex-shrink-0 mt-0.5">💡</span>
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong className="text-gray-800">Pas sûr·e de vous engager ?</strong>{" "}
          Commencez par une intervention express — si vous optez ensuite pour l&apos;abonnement,
          son montant est <strong className="text-plouf">intégralement déduit</strong>. Pas d&apos;argent perdu.
        </p>
      </div>
    </>
  )
}

// ─── Étape 2a — Taille (abonnement) ──────────────────────────────────────────

function StepTaille({ form, update, goNext, goBack }: {
  form: FormData; update: UpdateFn; goNext: (s: StepId) => void; goBack: (s: StepId) => void
}) {
  function choose(val: string) {
    update("taille", val)
    setTimeout(() => goNext("frequence"), 150)
  }

  return (
    <>
      <Question>Quelle est la taille de votre bassin ?</Question>
      <Hint>On s&apos;adapte à toutes les configurations.</Hint>

      <div className="space-y-3">
        {[
          { val: "petit", emoji: "🔵", label: "Petite",  sub: "Moins de 30 m³" },
          { val: "moyen", emoji: "🟡", label: "Moyenne", sub: "30 à 60 m³" },
          { val: "grand", emoji: "🟢", label: "Grande",  sub: "Plus de 60 m³" },
        ].map(o => (
          <OptionCard
            key={o.val}
            selected={form.taille === o.val}
            onClick={() => choose(o.val)}
            emoji={o.emoji}
            label={o.label}
            desc={o.sub}
          />
        ))}
      </div>

      <BtnBack onClick={() => goBack("type")} />
    </>
  )
}

// ─── Étape 2b — Fréquence (abonnement) ───────────────────────────────────────

function StepFrequence({ form, update, goNext, goBack }: {
  form: FormData; update: UpdateFn; goNext: (s: StepId) => void; goBack: (s: StepId) => void
}) {
  function choose(val: string) {
    update("frequence", val)
    setTimeout(() => goNext("traitement"), 150)
  }

  return (
    <>
      <Question>À quelle fréquence voulez-vous nos passages ?</Question>
      <Hint>Plus la fréquence est élevée, plus l&apos;eau est stable et sans surprises.</Hint>

      <div className="space-y-3">
        <OptionCard
          selected={form.frequence === "bimensuel"}
          onClick={() => choose("bimensuel")}
          emoji="📅"
          label="2 fois par mois"
          desc="Bimensuel — idéal pour les piscines bien équilibrées"
        />
        <OptionCard
          selected={form.frequence === "hebdomadaire"}
          onClick={() => choose("hebdomadaire")}
          emoji="⭐"
          label="4 fois par mois"
          tag="recommandé"
          desc="Hebdomadaire — eau cristalline toute la saison"
        />
      </div>

      {form.taille && (
        <div className="mt-5 flex gap-3 bg-plouf-glacier/30 border border-plouf-glacier rounded-2xl px-4 py-3.5">
          <span className="text-lg flex-shrink-0 mt-0.5">💶</span>
          <p className="text-xs text-gray-600 leading-relaxed">
            Pour un bassin{" "}
            <strong className="text-gray-800">
              {{ petit: "petite taille", moyen: "taille moyenne", grand: "grande taille" }[form.taille]}
            </strong>{" "}
            : à partir de{" "}
            <strong className="text-plouf">
              {TARIFS[form.taille]?.bimensuel} €/mois
            </strong>{" "}
            en bimensuel et{" "}
            <strong className="text-plouf">
              {TARIFS[form.taille]?.hebdomadaire} €/mois
            </strong>{" "}
            en hebdomadaire. Produits inclus.
          </p>
        </div>
      )}

      <BtnBack onClick={() => goBack("taille")} />
    </>
  )
}

// ─── Étape 2c — Traitement (abonnement) ──────────────────────────────────────

function StepTraitement({ form, update, goNext, goBack }: {
  form: FormData; update: UpdateFn; goNext: (s: StepId) => void; goBack: (s: StepId) => void
}) {
  function choose(val: string) {
    update("traitement", val)
    setTimeout(() => goNext("etat_eau"), 150)
  }

  const prixChlore = form.taille && form.frequence ? getPrix(form.taille, form.frequence, "chlore") : null
  const prixSel    = form.taille && form.frequence ? getPrix(form.taille, form.frequence, "sel")    : null

  return (
    <>
      <Question>Quel est votre type de traitement ?</Question>
      <Hint>Le sel (électrolyse) demande une maintenance spécifique — notre tarif est ajusté.</Hint>

      <div className="space-y-3">
        <OptionCard
          selected={form.traitement === "chlore"}
          onClick={() => choose("chlore")}
          emoji="🧪"
          label="Chlore"
          desc={prixChlore ? `Traitement classique — ${prixChlore} €/mois` : "Traitement classique"}
        />
        <OptionCard
          selected={form.traitement === "sel"}
          onClick={() => choose("sel")}
          emoji="🧂"
          label="Sel — électrolyse"
          desc={prixSel ? `Eau plus douce — ${prixSel} €/mois (+15%)` : "Eau plus douce (+15%)"}
        />
      </div>

      <BtnBack onClick={() => goBack("frequence")} />
    </>
  )
}

// ─── Étape 3 — État de l'eau ─────────────────────────────────────────────────

function StepEau({ form, update, goNext, goBack }: {
  form: FormData; update: UpdateFn; goNext: (s: StepId) => void; goBack: (s: StepId) => void
}) {
  const prevStep: StepId = form.type_intervention === "abonnement" ? "traitement" : "type"

  function choose(val: string) {
    update("etat_eau", val)
    setTimeout(() => goNext("zone"), 150)
  }

  return (
    <>
      <Question>Comment est l&apos;eau de votre piscine en ce moment ?</Question>
      <Hint>On prépare le bon matériel avant le passage.</Hint>

      <div className="space-y-3">
        <OptionCard
          selected={form.etat_eau === "claire"}
          onClick={() => choose("claire")}
          emoji="✨"
          label="Claire et transparente"
          desc="Propre, on maintient juste l'équilibre"
        />
        <OptionCard
          selected={form.etat_eau === "trouble"}
          onClick={() => choose("trouble")}
          emoji="😐"
          label="Un peu trouble"
          desc="Voilée, pas encore verte"
        />
        <OptionCard
          selected={form.etat_eau === "verte"}
          onClick={() => choose("verte")}
          emoji="🟢"
          label="Verte"
          desc="On s'en occupe — traitement choc inclus"
          warning
        />
        <OptionCard
          selected={form.etat_eau === "je_sais_pas"}
          onClick={() => choose("je_sais_pas")}
          emoji="🤷"
          label="Je ne sais pas"
          desc="On évalue sur place"
        />
      </div>

      <BtnBack onClick={() => goBack(prevStep)} />
    </>
  )
}

// ─── Étape 4 — Zone ──────────────────────────────────────────────────────────

function StepZone({ form, update, goNext, goBack }: {
  form: FormData; update: UpdateFn; goNext: (s: StepId) => void; goBack: (s: StepId) => void
}) {
  function choose(val: string) {
    update("zone", val)
    setTimeout(() => goNext("coordonnees"), 150)
  }

  return (
    <>
      <Question>Vous êtes dans quel secteur ?</Question>
      <Hint>On intervient sur Bordeaux, le Médoc et le Bassin d&apos;Arcachon.</Hint>

      <div className="space-y-3">
        <OptionCard
          selected={form.zone === "bordeaux_metropole"}
          onClick={() => choose("bordeaux_metropole")}
          emoji="🏙"
          label="Bordeaux Métropole"
          desc="Bruges, Le Bouscat, Mérignac, Eysines, Pessac…"
        />
        <OptionCard
          selected={form.zone === "medoc_bassin"}
          onClick={() => choose("medoc_bassin")}
          emoji="🌅"
          label="Médoc & Bassin d'Arcachon"
          desc="Pauillac, Lesparre, Soulac, Arcachon…"
        />
      </div>

      <BtnBack onClick={() => goBack("etat_eau")} />
    </>
  )
}

// ─── Étape 5 — Coordonnées ────────────────────────────────────────────────────

function StepCoordonnees({ form, update, goNext, goBack }: {
  form: FormData; update: UpdateFn; goNext: (s: StepId) => void; goBack: (s: StepId) => void
}) {
  const valid = form.prenom && form.nom && form.email && form.telephone && form.adresse && form.ville && form.code_postal

  return (
    <>
      <Question>Vos coordonnées</Question>
      <Hint>On vous rappelle sous 2h pour confirmer le premier passage.</Hint>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Prénom" value={form.prenom} onChange={v => update("prenom", v)} placeholder="Marie" autoFocus />
          <Field label="Nom"    value={form.nom}    onChange={v => update("nom", v)}    placeholder="Dupont" />
        </div>
        <Field label="Téléphone" type="tel"   value={form.telephone} onChange={v => update("telephone", v)} placeholder="06 00 00 00 00" />
        <Field label="Email"     type="email" value={form.email}     onChange={v => update("email", v)}     placeholder="marie@email.com" />
        <Field label="Adresse"               value={form.adresse}   onChange={v => update("adresse", v)}   placeholder="15 rue des Roses" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Code postal" value={form.code_postal} onChange={v => update("code_postal", v)} placeholder="33000" />
          <Field label="Ville"       value={form.ville}       onChange={v => update("ville", v)}       placeholder="Bordeaux" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            Notes <span className="font-normal normal-case text-gray-400">(facultatif)</span>
          </label>
          <textarea
            value={form.notes} onChange={e => update("notes", e.target.value)} rows={2}
            placeholder="Code portail, accès spécifique…"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-plouf/30 focus:border-plouf transition-all resize-none text-gray-900 text-sm"
          />
        </div>
      </div>

      <BtnNext onClick={() => goNext("recap")} disabled={!valid} />
      <BtnBack onClick={() => goBack("zone")} />
    </>
  )
}

// ─── Étape 6 — Récap ─────────────────────────────────────────────────────────

function StepRecap({ form, prix, loading, erreur, onSubmit, goBack }: {
  form: FormData; prix: number | null; loading: boolean; erreur: string
  onSubmit: () => void; goBack: () => void
}) {
  const isAbo = form.type_intervention === "abonnement"
  const TAILLES: Record<string, string> = { petit: "Petite", moyen: "Moyenne", grand: "Grande" }

  const rows: [string, string][] = [
    ["Type", isAbo ? "Abonnement saisonnier" : "Intervention express"],
    ...(isAbo ? [
      ["Bassin",     `${TAILLES[form.taille] ?? ""} · ${form.traitement === "sel" ? "Sel" : "Chlore"}`],
      ["Fréquence",  form.frequence === "hebdomadaire" ? "4×/mois" : "2×/mois"],
    ] as [string, string][] : []),
    ["État de l'eau", ({
      claire: "Claire ✨", trouble: "Trouble 😐", verte: "Verte 🟢", je_sais_pas: "Je ne sais pas",
    } as Record<string, string>)[form.etat_eau] ?? form.etat_eau],
    ["Zone",    form.zone === "bordeaux_metropole" ? "Bordeaux Métropole" : "Médoc / Bassin d'Arcachon"],
    ["Adresse", `${form.adresse}, ${form.code_postal} ${form.ville}`],
    ["Contact", `${form.prenom} ${form.nom} · ${form.telephone}`],
    ["Email",    form.email],
  ]

  return (
    <>
      <Question>Tout est bon ?</Question>
      <Hint>On vous rappelle sous 2h pour organiser le premier passage.</Hint>

      <div className="space-y-1.5 mb-5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0">
            <span className="text-gray-400 flex-shrink-0 mr-3">{k}</span>
            <span className="font-medium text-gray-800 text-right">{v}</span>
          </div>
        ))}
      </div>

      {prix && (
        <div className="bg-plouf text-white rounded-2xl px-5 py-4 mb-5 flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs mb-0.5">Estimation mensuelle</p>
            <p className="font-title font-bold text-2xl">{prix} €<span className="text-base font-normal">/mois</span></p>
          </div>
          <p className="text-white/60 text-xs text-right leading-relaxed">Produits inclus<br />Tarif confirmé par téléphone</p>
        </div>
      )}

      {erreur && <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl mb-4">{erreur}</p>}

      <button onClick={onSubmit} disabled={loading}
        className="w-full bg-plouf text-white font-bold py-4 rounded-xl hover:bg-plouf-dark transition-colors disabled:opacity-60 text-base"
      >
        {loading ? "Envoi en cours…" : "Envoyer ma demande →"}
      </button>

      <p className="text-xs text-center text-gray-400 mt-3">
        Aucun paiement maintenant — on vous rappelle sous 2h.
      </p>

      <BtnBack onClick={goBack} />
    </>
  )
}

// ─── Écran de succès ──────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "linear-gradient(135deg, #E7EBFF 0%, #D6F2F7 55%, #eaf7fb 100%)" }}
    >
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-plouf/10 p-10 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-title font-bold text-2xl text-gray-900 mb-3">Demande envoyée !</h1>
        <p className="text-gray-500 leading-relaxed mb-8">
          Notre équipe vous rappelle <strong>sous 2h</strong> pour confirmer le premier passage et répondre à vos questions.
        </p>
        <div className="space-y-3 text-sm text-left mb-8 bg-gray-50 rounded-2xl p-5">
          {[
            ["1", "On vous rappelle", "Sous 2h — par téléphone."],
            ["2", "On fixe le premier passage", "Date, heure, accès — on s'organise avec vous."],
            ["3", "Le technicien arrive", "Vous n'avez rien à préparer."],
          ].map(([n, t, d]) => (
            <div key={n} className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-plouf text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{n}</div>
              <div>
                <p className="font-semibold text-gray-800">{t}</p>
                <p className="text-gray-400 text-xs mt-0.5">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mb-6">
          Un problème urgent ?{" "}
          <a href="tel:0554540880" className="text-plouf font-semibold">05 54 54 08 80</a>
        </p>
        <Link href="/" className="inline-block bg-plouf text-white font-semibold px-6 py-3 rounded-xl hover:bg-plouf-dark transition-colors text-sm">
          Retour à l&apos;accueil →
        </Link>
      </div>
    </div>
  )
}
