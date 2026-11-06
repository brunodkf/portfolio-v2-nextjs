import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { ogLocale, siteConfig } from '@/config/site';

export type PageKey = 'home' | 'about' | 'projects' | 'experience' | 'feedback' | 'contact';

export function localizedPath(locale: Locale, path: string) {
  return `/${locale}${path === '/' ? '' : path}`;
}

export function alternatesFor(locale: Locale, path: string): Metadata['alternates'] {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, localizedPath(l, path)])),
      'x-default': localizedPath(routing.defaultLocale, path),
    },
  };
}

interface BuildOptions {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
  type?: 'website' | 'article' | 'profile';
}

export function buildMetadata({ locale, path, title, description, absoluteTitle, image, type = 'website' }: BuildOptions): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const ogImage = image ?? { url: `/og/og-${locale}.png`, width: 1200, height: 630, alt: fullTitle };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type,
      url: localizedPath(locale, path),
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      locale: ogLocale[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}

export async function pageMetadata(locale: Locale, page: PageKey, path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata.pages' });
  return buildMetadata({
    locale,
    path,
    title: t(`${page}.title`),
    description: t(`${page}.description`),
    absoluteTitle: page === 'home',
    type: page === 'home' ? 'profile' : 'website',
  });
}
