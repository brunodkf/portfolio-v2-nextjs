# Bruno Furtado: Portfolio

Personal portfolio of Bruno Furtado, Software Engineer. Live at [brunodkf.dev](https://brunodkf.dev).

## Stack

- **Next.js 16** (App Router, static generation for every page)
- **React 19** + **TypeScript** (strict)
- **next-intl**: Portuguese (`/pt`, default) and English (`/en`)
- **Tailwind CSS**: design tokens in `tailwind.config.ts` and `app/[locale]/globals.css`
- **Framer Motion** (animations, respecting `prefers-reduced-motion`) and **Swiper** (testimonials carousel)

## Running

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run check      # TypeScript + ESLint
npm run assets     # regenerate résumé PDFs and Open Graph images (needs local Chrome; CHROME_PATH to override)
```

## Structure

```
app/
  [locale]/            pages (home, sobre, projetos, projetos/[slug], experiencia, depoimentos, contato, 404)
  components/
    hud/               the HUD: top navigation, side rails, mobile drawer, footer, decorative hexagons
    projects/          showcase blocks, device frames, architecture diagram
    ui/                shared page primitives (PageFrame, Reveal, TechList)
  sitemap.ts, robots.ts
messages/              UI copy per locale (pt.json / en.json must keep the same shape, checked by tsc)
src/
  config/              site constants, navigation (single source of truth for the HUD)
  content/projects.ts  project data and case studies (verifiable facts only)
  i18n/                next-intl routing and request config
  lib/                 metadata helpers, theme persistence
scripts/
  assets/              HTML sources for the résumé (PT/EN) and Open Graph images
  render-static-assets.mjs
```

## Content rules

Everything published about Bruno must be true and verifiable (public code, repository docs, live sites or existing testimonials). Do not add metrics, clients or responsibilities without evidence, and never publish confidential work.

## Contact

- [LinkedIn](https://www.linkedin.com/in/brunodkf)
- [GitHub](https://github.com/brunodkf)
