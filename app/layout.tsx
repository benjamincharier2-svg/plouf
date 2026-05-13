import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plouf — Entretien de piscine à domicile",
  description: "Service d'entretien de piscines à domicile sur Bordeaux Métropole et le Médoc. Devis instantané, réservation en ligne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
