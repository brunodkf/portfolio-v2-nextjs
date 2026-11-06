import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        title: ["var(--font-antonio)", "sans-serif"],
      },
      colors: {
        background: {
          DEFAULT: "#f8f9fa",
          dark: "#1e1e1e",
        },
        text: {
          DEFAULT: "#1e1e1e",
          dark: "#ededed",
        },

        cinza: "#2c2c2c",
        laranja: "#dfa47d",
        creme: "#fffae4",
        laranja2: "#df8e3a",
        // Darker orange for text on light backgrounds (≥ 4.5:1 on creme).
        cobre: "#a3561c",
        preto: "#1e1e1e",
        branco: "#ededed",

        // Theme-aware tokens, resolved by CSS variables in globals.css.
        fg: "rgb(var(--color-fg) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
      },
    },
  },
  plugins: [],
} satisfies Config;
