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
          DEFAULT: "#1A00CC",
          dark:    "#1200A0",
          light:   "#EEE9FF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
