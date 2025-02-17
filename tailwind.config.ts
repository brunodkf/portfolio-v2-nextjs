import type { Config } from "tailwindcss";
import type { PluginAPI } from 'tailwindcss/types/config';
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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

        '.line': {
          position: 'relative'
        },
        '.line:before':{
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
        '.line:after':{
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
