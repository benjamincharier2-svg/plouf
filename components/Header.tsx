"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/tarifs",       label: "Tarifs" },
  { href: "/interventions", label: "Interventions" },
  { href: "/conseils",     label: "Nos conseils" },
  { href: "/a-propos",     label: "À propos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-10">
            <Link href="/" onClick={() => setOpen(false)}>
              <Image src="/logo-bleu.png" alt="Plouf Piscines" width={80} height={36} className="object-contain rounded-xl overflow-hidden" />
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-7 text-sm text-gray-600">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`hover:text-plouf transition-colors ${pathname === href ? "text-plouf font-semibold" : ""}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Droite : CTA desktop + burger mobile */}
          <div className="flex items-center gap-3">
            <a
              href="tel:0554540880"
              className="hidden md:inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-plouf transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              05 54 54 08 80
            </a>
            <Link
              href="/reserver"
              className="hidden md:inline-flex bg-plouf text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-plouf-dark transition-colors shadow-sm shadow-plouf/30"
            >
              Réserver →
            </Link>

            {/* Téléphone mobile */}
            <a
              href="tel:0554540880"
              className="md:hidden flex items-center gap-1.5 bg-plouf text-white px-3 py-2 rounded-lg text-sm font-semibold"
              aria-label="Appeler Plouf Piscines"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Appeler
            </a>

            {/* Burger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile déroulant */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-xl px-6 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1 mb-4">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`py-3 text-base border-b border-gray-50 last:border-0 ${
                    pathname === href ? "text-plouf font-semibold" : "text-gray-700"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <Link
              href="/reserver"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-plouf text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-plouf-dark transition-colors"
            >
              Réserver une intervention →
            </Link>
            <div className="mt-3 text-center text-sm text-gray-400">
              <a href="tel:0554540880" className="hover:text-plouf transition-colors">
                05 54 54 08 80
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
