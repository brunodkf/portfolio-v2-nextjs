import type { Metadata } from "next";
import { Inter } from 'next/font/google';

import "./globals.css";
import { Navbar } from "./components/Navbar";
import MenuLateral from "./components/MenuLateral";
import SocialLateral from "./components/SocialLateral";

const inter = Inter({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Bruno Furtado",
  description: "Transformo código em experiências incríveis! Sou um dev front-end apaixonado por design e interatividade. Veja meus projetos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased bg-dark-global flex items-center justify-center relative`}
      >
        <Navbar />

        <section className="container flex relative">
          <MenuLateral />

          {children}

          <SocialLateral />
        </section>


      </body>
    </html>
  );
}
