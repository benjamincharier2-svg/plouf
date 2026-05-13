"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EauVertePage() {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    description: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (photo) data.append("photo", photo);

      const res = await fetch("/api/eau-verte", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      setSent(true);
    } catch {
      setError("Une erreur s'est produite. Veuillez réessayer ou nous appeler directement.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo-bleu.png" alt="plouf!" width={90} height={40} className="object-contain" />
          </Link>
          <Link
            href="/reserver"
            className="bg-[#1A00CC] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#1200A0] transition-colors"
          >
            Réserver
          </Link>
        </div>
      </header>

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Urgence badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            On vous rappelle sous 2h
          </div>

          {/* Titre */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Eau verte ?<br />
            <span className="text-[#1A00CC]">On s'en occupe.</span>
          </h1>

          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            L'eau verte est une urgence — algues, bactéries, risque sanitaire.
            Décrivez-nous votre situation et notre équipe vous contacte sous 2h
            pour organiser une intervention rapide.
          </p>

          {/* Carte infos */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { emoji: "⚡", label: "Intervention", value: "sous 48h" },
              { emoji: "🧪", label: "Traitement", value: "choc + algicide" },
              { emoji: "✅", label: "Résultat", value: "garanti" },
            ].map((item) => (
              <div key={item.label} className="bg-[#EEE9FF] rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="text-sm font-bold text-[#1A00CC]">{item.value}</div>
              </div>
            ))}
          </div>

          {sent ? (
            /* Succès */
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Message reçu !</h2>
              <p className="text-gray-600 mb-6">
                Notre équipe va analyser votre situation et vous contacte{" "}
                <strong>sous 2h</strong> pour organiser l'intervention.
              </p>
              <Link
                href="/"
                className="inline-block bg-[#1A00CC] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#1200A0] transition-colors"
              >
                Retour à l'accueil
              </Link>
            </div>
          ) : (
            /* Formulaire */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    required
                    placeholder="Marie"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A00CC]/30 focus:border-[#1A00CC] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    required
                    placeholder="Dupont"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A00CC]/30 focus:border-[#1A00CC] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="marie@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A00CC]/30 focus:border-[#1A00CC] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  required
                  placeholder="06 00 00 00 00"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A00CC]/30 focus:border-[#1A00CC] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Décrivez votre situation *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Ex: piscine de 8x4m, eau verte depuis 1 semaine, traitement au chlore habituellement. Ville : Bordeaux."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A00CC]/30 focus:border-[#1A00CC] transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Photo de votre piscine{" "}
                  <span className="text-gray-400 font-normal">(optionnel)</span>
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#1A00CC]/40 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    {photo ? (
                      <div className="text-[#1A00CC] font-medium">
                        📷 {photo.name}
                      </div>
                    ) : (
                      <div>
                        <div className="text-3xl mb-2">📷</div>
                        <div className="text-sm text-gray-500">
                          Cliquez pour ajouter une photo
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          JPG, PNG — max 10 Mo
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1A00CC] text-white font-bold py-4 rounded-xl hover:bg-[#1200A0] transition-colors disabled:opacity-50 text-lg"
              >
                {loading ? "Envoi en cours..." : "Envoyer — on vous rappelle sous 2h"}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Vos données sont utilisées uniquement pour vous recontacter.
                Aucun spam, aucune revente.
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
