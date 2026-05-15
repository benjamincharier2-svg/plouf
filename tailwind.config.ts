import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        plouf: {
          DEFAULT:  "#1313D6",  // Bleu Plouf
          dark:     "#0E0EB8",  // Bleu Plouf foncé
          eau:      "#9EE6F7",  // Bleu Eau
          glacier:  "#D6F2F7",  // Bleu Glacier
          lavande:  "#E7EBFF",  // Lavande
          sable:    "#FFF3D6",  // Sable
          turquoise:"#00C2D6",  // Turquoise
        },
        brand: {
          anthracite:     "#111827",
          "gris-fonce":   "#374151",
          "gris-moyen":   "#6B7280",
          "gris-clair":   "#D1D5DB",
          "gris-tres-clair": "#F3F4F6",
        },
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
        title: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
