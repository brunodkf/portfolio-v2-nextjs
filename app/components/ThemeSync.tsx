'use client';

import { useLayoutEffect } from 'react';

import { restoreTheme } from '@/lib/theme';


export function ThemeSync({ locale }: { locale: string }) {
  useLayoutEffect(() => {
    restoreTheme();
  }, [locale]);

  return null;
}
