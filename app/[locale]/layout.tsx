import type { Metadata, Viewport } from 'next';
import { Antonio, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';

import './globals.css';

import { MotionProvider } from '../components/MotionProvider';
import { ThemeScript } from '../components/ThemeScript';
import { ThemeSync } from '../components/ThemeSync';
import { DecorativeElements } from '../components/hud/DecorativeElements';
import { HudFooter } from '../components/hud/HudFooter';
import { SideNavigation } from '../components/hud/SideNavigation';
import { SkipLink } from '../components/hud/SkipLink';
import { SocialNavigation } from '../components/hud/SocialNavigation';
import { TopNavigation } from '../components/hud/TopNavigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const antonio = Antonio({ subsets: ['latin'], variable: '--font-antonio' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t('siteTitle'), template: `%s | ${siteConfig.name}` },
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    icons: { icon: '/favicon.ico' },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1e1e1e' },
    { media: '(prefers-color-scheme: light)', color: '#fffae4' },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  // Only the namespaces used by client components are serialized to the browser.
  const { Hud, Navigation } = await getMessages();

  return (
   <html lang={locale} className={`${inter.variable} ${antonio.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning className="font-sans lg:overflow-clip antialiased bg-creme dark:bg-dark-global text-fg w-screen h-screen flex flex-col items-center lg:justify-center relative">
        <ThemeSync locale={locale} />
        <NextIntlClientProvider messages={{ Hud, Navigation }}>
          <MotionProvider>
            <SkipLink />
            <TopNavigation />
            <div className="container flex relative">
              <SideNavigation />
              <main
                id="main-content"
                tabIndex={-1}
                className="relative min-w-0 flex-1 outline-none lg:mx-14 lg:h-svh lg:overflow-y-auto custom-scrollbar lg:hud-scroll-fade"
              >
                {children}
              </main>
              <SocialNavigation />
            </div>
            <HudFooter />
            <DecorativeElements />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
