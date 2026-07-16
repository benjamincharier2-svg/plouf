import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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
    default: "Plouf Piscines - Entretien piscine à domicile Bordeaux, Médoc, Arcachon",
    template: "%s | Plouf Piscines",
  },
  description:
    "Entretien de piscine à domicile sur Bordeaux Métropole, le Médoc et le Bassin d'Arcachon. Abonnements dès 120 €/mois, interventions express. On vous rappelle.",
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
    title: "Plouf Piscines - Entretien piscine à domicile Bordeaux, Médoc, Arcachon",
    description:
      "Abonnements dès 120 €/mois, interventions express. On s'occupe de tout, vous profitez. On vous rappelle.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Plouf Piscines - Entretien piscine à domicile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plouf Piscines - Entretien piscine à domicile",
    description: "Bordeaux, Médoc, Arcachon. Abonnements dès 120 €/mois. On vous rappelle.",
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
        <Analytics />

        {/* Google Ads + Analytics tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1HYTNJBHM4"
          strategy="afterInteractive"
        />
        <Script id="google-tags" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1HYTNJBHM4');
            gtag('config', 'AW-18164536899');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4363719180440844');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <noscript><img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=4363719180440844&ev=PageView&noscript=1" alt="" /></noscript>
      </body>
    </html>
  );
}
