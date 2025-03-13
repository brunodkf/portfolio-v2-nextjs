"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProviderClient({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    // console.log("Tema atual antes da correção:", theme);

    // Se o tema salvo for inválido ou não existir, define "dark" como padrão
    if (!theme || !["light", "dark", "system"].includes(theme)) {
      console.warn("Tema inválido ou ausente. Definindo como 'dark'.");
      localStorage.setItem("theme", "dark");

      // Força a classe no <html> para evitar erro visual antes da re-hidratação
      document.documentElement.classList.add("dark");
    }

    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}
