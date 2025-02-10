import type { Config } from "tailwindcss";
import type { PluginAPI } from 'tailwindcss/types/config';
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cinza: '#2c2c2c',
        laranja: '#dfa47d',
        preto: '#1e1e1e',
        branco: '#ededed'
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: PluginAPI) {
      const newUtilities = {
        '.bg-dark-global': {
          backgroundColor: '#1e1e1e',
          background: 'radial-gradient(circle, #2c2c2c, #282828, #252525, #212121, #1e1e1e);'
        },

        '.tec': {
          position: 'relative'
        },
        '.tec:before':{
          content: '""',
          position: 'absolute',
          display: 'block',
          width: '3px',
          height: '3em',
          backgroundColor: '#ededed',
          top: '-4rem',
          borderRadius: '10%',
          opacity: '.7'
        },
        '.tec:after':{
          content: '""',
          position: 'absolute',
          display: 'block',
          width: '3px',
          height: '3em',
          backgroundColor: '#ededed',
          bottom: '-4rem',
          borderRadius: '10%',
          opacity: '.7'
        },

      };
      addUtilities(newUtilities);
    }),
  ],
} satisfies Config;
