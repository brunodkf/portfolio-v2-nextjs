import type { Metadata } from "next";
import { Inter } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import "./globals.css";

import { Navbar } from "../components/Navbar";
import MenuLateral from "../components/MenuLateral";
import Footer from "../components/Footer";
import BackgroundDetail from "../components/BackgroundDetail";
import SocialLateral from "../components/SocialLateral";

import { ThemeProviderClient } from "@/context/ThemeProviderClient";

const inter = Inter({
  subsets: ['latin'], preload: true
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
    <html lang={locale} suppressHydrationWarning>
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
        className={`${inter.className} lg:overflow-clip antialiased bg-creme dark:bg-dark-global w-screen h-screen flex flex-col items-center justify-center relative`}
      >
        <ThemeProviderClient>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <section className="mainContent container flex relative">
              <MenuLateral />
              {children}
              <SocialLateral />
            </section>
            <Footer />
            <BackgroundDetail />
          </NextIntlClientProvider>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
