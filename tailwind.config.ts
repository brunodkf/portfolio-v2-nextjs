import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");


/** @type {import('tailwindcss').Config} */

export default {
  
  darkMode: "class", // Permite alternância de tema via classes CSS

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "dark:bg-background-dark",
    "dark:text-dark",
    "dark:bg-cinza",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        title: ["Antonio", "sans-serif"],
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
        laranja2: "#df8e3a",
        preto: "#1e1e1e",
        branco: "#ededed",
        
      },
    },
  },
  plugins: [],
} satisfies Config;
