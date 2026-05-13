"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type State = "loading" | "confirm" | "success" | "error" | "already";

export default function AnnulerPage() {
  const { token } = useParams<{ token: string }>();
  const [state, setState] = useState<State>("confirm");
  const [frais, setFrais] = useState(0);
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Récupérer l'ID de réservation à partir du token
    async function fetchReservation() {
      try {
        const res = await fetch(`/api/annuler/info?token=${token}`);
        if (!res.ok) {
          const data = await res.json();
          if (data?.already) {
            setState("already");
          } else {
            setState("error");
            setErrorMsg(data?.error ?? "Lien invalide ou expiré.");
          }
          return;
        }
        const data = await res.json();
        setReservationId(data.id);
        setFrais(data.frais_eventuels ?? 0);
        setState("confirm");
      } catch {
        setState("error");
        setErrorMsg("Une erreur est survenue.");
      }
    }
    fetchReservation();
  }, [token]);

  async function confirmerAnnulation() {
    if (!reservationId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/reservations/${reservationId}/annuler`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Erreur");
      setFrais(data.frais);
      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/">
            <Image src="/logo-bleu.png" alt="plouf!" width={90} height={40} className="object-contain" />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">

          {state === "loading" && (
            <div className="text-center text-gray-500">Chargement...</div>
          )}

          {state === "confirm" && (
            <div className="text-center">
              <div className="text-5xl mb-6">🗑️</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Annuler votre réservation ?
              </h1>
              {frais > 0 ? (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-6 text-sm text-orange-800">
                  <strong>Attention :</strong> votre intervention est dans moins de 24h.
                  Des frais d'annulation de <strong>{frais.toFixed(2)} €</strong> seront prélevés
                  (25 % du montant mensuel).
                </div>
              ) : (
                <p className="text-gray-600 mb-6">
                  Aucun frais ne sera prélevé — la pré-autorisation bancaire sera simplement annulée.
                </p>
              )}
              <button
                onClick={confirmerAnnulation}
                disabled={loading}
                className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 mb-4"
              >
                {loading ? "Annulation en cours..." : "Confirmer l'annulation"}
              </button>
              <Link href="/" className="text-sm text-gray-500 hover:underline">
                Finalement, je garde ma réservation
              </Link>
            </div>
          )}

          {state === "success" && (
            <div className="text-center">
              <div className="text-5xl mb-6">✅</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Réservation annulée
              </h1>
              <p className="text-gray-600 mb-4">
                Votre réservation a bien été annulée. Vous recevrez un email de confirmation.
              </p>
              {frais > 0 && (
                <p className="text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                  Frais d'annulation prélevés : <strong>{frais.toFixed(2)} €</strong>
                </p>
              )}
              <Link
                href="/reserver"
                className="inline-block bg-[#1A00CC] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#1200A0] transition-colors"
              >
                Faire une nouvelle réservation
              </Link>
            </div>
          )}

          {state === "already" && (
            <div className="text-center">
              <div className="text-5xl mb-6">ℹ️</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Déjà annulée
              </h1>
              <p className="text-gray-600 mb-6">
                Cette réservation a déjà été annulée.
              </p>
              <Link href="/" className="text-[#1A00CC] hover:underline">Retour à l'accueil</Link>
            </div>
          )}

          {state === "error" && (
            <div className="text-center">
              <div className="text-5xl mb-6">❌</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Lien invalide
              </h1>
              <p className="text-gray-600 mb-6">
                {errorMsg || "Ce lien d'annulation est invalide ou a expiré."}
              </p>
              <Link
                href="mailto:contact@ploufpiscines.fr"
                className="text-[#1A00CC] hover:underline"
              >
                Contactez-nous
              </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
