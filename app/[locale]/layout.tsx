import type { Metadata } from "next";
import { Inter } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import "./globals.css";

import { Navbar } from "./components/Navbar";
import MenuLateral from "./components/MenuLateral";
import SocialLateral from "./components/SocialLateral";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ['latin'], preload: true
});

export const metadata: Metadata = {
  title: "Bruno Furtado",
  description: "Transformo código em experiências incríveis! Sou um dev front-end apaixonado por design e interatividade. Veja meus projetos!",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  
  const awaitedParams = await params;
  const { locale } = awaitedParams;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased bg-dark-global flex flex-col items-center justify-center relative`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <section className="midContent container flex relative">
            <MenuLateral />
            {children}
            <SocialLateral />
          </section>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}