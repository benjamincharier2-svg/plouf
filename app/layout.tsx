import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const APP_URL = "https://ploufpiscines.fr";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Plouf Piscines — Entretien piscine à domicile Bordeaux, Médoc, Arcachon",
    template: "%s | Plouf Piscines",
  },
  description:
    "Entretien de piscine à domicile sur Bordeaux Métropole, le Médoc et le Bassin d'Arcachon. Abonnements dès 120 €/mois, interventions express. Rappel sous 2h.",
  keywords: [
    "entretien piscine Bordeaux",
    "entretien piscine Médoc",
    "entretien piscine Arcachon",
    "technicien piscine Bordeaux",
    "nettoyage piscine Bordeaux",
    "abonnement entretien piscine",
    "hivernage piscine Bordeaux",
    "remise en route piscine printemps",
    "entretien piscine à domicile",
    "Plouf Piscines",
  ],
  authors: [{ name: "Plouf Piscines", url: APP_URL }],
  creator: "Plouf Piscines",
  publisher: "INTENDANCE SAS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: APP_URL,
    siteName: "Plouf Piscines",
    title: "Plouf Piscines — Entretien piscine à domicile Bordeaux, Médoc, Arcachon",
    description:
      "Abonnements dès 120 €/mois, interventions express. On s'occupe de tout, vous profitez. Rappel sous 2h.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Plouf Piscines — Entretien piscine à domicile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plouf Piscines — Entretien piscine à domicile",
    description: "Bordeaux, Médoc, Arcachon. Abonnements dès 120 €/mois. Rappel sous 2h.",
    images: ["/hero.jpg"],
  },
  alternates: {
    canonical: APP_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable}`}>
      <body className="antialiased bg-white text-brand-anthracite font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
