"use client"

import Image from "next/image"

// ─── Données ──────────────────────────────────────────────────────────────────
// Remplissez `avant` et `apres` avec les chemins des vraies photos au fur et à mesure.
// Mettez null pour afficher un placeholder coloré.

const ITEMS: { avant: string | null; apres: string | null; label: string }[] = [
  { avant: "/avant-1.jpg", apres: "/apres-1.jpg", label: "Eau verte → cristalline" },
  { avant: "/avant-2.jpg", apres: "/apres-2.jpg", label: "Remise en route printemps" },
  { avant: "/avant-3.jpg", apres: "/apres-3.jpg", label: "Hivernage → saison" },
]

// Dupliquer pour le défilement sans couture
const LOOP = [...ITEMS, ...ITEMS, ...ITEMS]

// ─── Sous-composants ──────────────────────────────────────────────────────────

function PhotoSlot({
  src,
  alt,
  tag,
  tagColor,
  bg,
}: {
  src: string | null
  alt: string
  tag: string
  tagColor: string
  bg: string
}) {
  return (
    <div className="relative w-[160px] h-[200px] rounded-xl overflow-hidden flex-shrink-0">
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className={`w-full h-full ${bg}`} />
      )}
      <span
        className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 ${tagColor}`}
      >
        {tag}
      </span>
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function AvantApresCarousel() {
  return (
    <section className="py-12 bg-white overflow-hidden border-y border-gray-100">
      {/* Titre */}
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
            Résultats réels
          </p>
          <h2 className="font-title font-bold text-xl text-gray-900">
            Avant{" "}
            <span className="text-plouf">·</span>{" "}
            Après
          </h2>
        </div>
        <p className="text-gray-400 text-sm hidden md:block">
          Chaque intervention laisse une trace.
        </p>
      </div>

      {/* Piste défilante */}
      <div className="relative">
        {/* Fondu gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #ffffff, transparent)" }}
        />
        {/* Fondu droite */}
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #ffffff, transparent)" }}
        />

        {/* Animation CSS inline — pas besoin de modifier tailwind.config */}
        <style>{`
          @keyframes plouf-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .plouf-carousel-track {
            animation: plouf-scroll 40s linear infinite;
          }
          .plouf-carousel-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div
          className="plouf-carousel-track flex gap-5 w-max px-6"
          aria-hidden="true"
        >
          {LOOP.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 flex-shrink-0"
            >
              {/* Carte avant/après */}
              <div className="flex gap-2 items-center bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
                <PhotoSlot
                  src={item.avant}
                  alt={`Avant — ${item.label}`}
                  tag="AVANT"
                  tagColor="text-green-700"
                  bg="bg-gradient-to-br from-green-900/50 to-green-700/20"
                />

                {/* Flèche centrale */}
                <div className="flex flex-col items-center gap-1 px-1">
                  <svg className="w-5 h-5 text-plouf/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <p className="text-[9px] text-gray-400 text-center leading-tight max-w-[50px]">
                    {item.label}
                  </p>
                </div>

                <PhotoSlot
                  src={item.apres}
                  alt={`Après — ${item.label}`}
                  tag="APRÈS"
                  tagColor="text-blue-700"
                  bg="bg-gradient-to-br from-plouf-glacier/50 to-plouf-eau/30"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
