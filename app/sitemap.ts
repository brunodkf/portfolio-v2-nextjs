import type { MetadataRoute } from 'next';

import { pagePaths } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { caseStudies } from '@/content/projects';
import { routing } from '@/i18n/routing';
import { localizedPath } from '@/lib/metadata';

const absolute = (path: string) => `${siteConfig.url}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...pagePaths, ...caseStudies.map((p) => `/projetos/${p.slug}`)];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absolute(localizedPath(locale, path)),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absolute(localizedPath(l, path))])),
      },
    })),
  );
}
