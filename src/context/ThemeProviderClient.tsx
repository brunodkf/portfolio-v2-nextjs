"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProviderClient({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (!theme || !["light", "dark", "system"].includes(theme)) {
      console.warn("Tema inválido ou ausente. Definindo como 'dark'.");
      localStorage.setItem("theme", "dark");
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
