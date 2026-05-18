import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes entretien piscine Bordeaux",
  description:
    "Toutes les réponses sur l'entretien de piscine à domicile : présence obligatoire, tarifs, eau trouble, hivernage... Par Plouf Piscines, Bordeaux Médoc Arcachon.",
  alternates: { canonical: "https://ploufpiscines.fr/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
