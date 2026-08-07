import type { Metadata } from "next";
import { Antonio, Inter, JetBrains_Mono } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import "./globals.css";

import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import AmbientBackground from "../components/home/AmbientBackground";

import { ThemeProviderClient } from "@/context/ThemeProviderClient";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  preload: true,
});

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-antonio',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  preload: true,
});

export const metadata: Metadata = {
  title: "Bruno Furtado",
  description: "Transformo código em experiências incríveis! Sou um dev front-end apaixonado por design e interatividade. Veja meus projetos!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  const awaitedParams = await params;
  const { locale } = awaitedParams;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${antonio.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/*
          FOUC prevention — runs synchronously before React hydration.
          Rendered in a Server Component so React 19 never reconciles it
          on the client, avoiding the "script tag" warning entirely.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.add(t==='light'?'light':'dark')}catch(e){document.documentElement.classList.add('dark')}}()`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased bg-creme dark:bg-dark-global w-full min-h-screen relative`}
      >
        <ThemeProviderClient>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AmbientBackground />
            <Navbar />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
