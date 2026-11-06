import type { Locale } from 'next-intl';

export const siteConfig = {
  url: 'https://brunodkf.dev',
  name: 'Bruno Furtado',
  email: 'bsouzacc@gmail.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/brunodkf/',
    github: 'https://github.com/brunodkf',
    instagram: 'https://www.instagram.com/_devbruno',
    whatsapp: 'https://api.whatsapp.com/send?phone=5521971564659',
  },
} as const;

export const resumePath: Record<Locale, string> = {
  pt: '/docs/bruno-furtado-curriculo-pt.pdf',
  en: '/docs/bruno-furtado-resume-en.pdf',
};

export const ogLocale: Record<Locale, string> = {
  pt: 'pt_BR',
  en: 'en_US',
};
