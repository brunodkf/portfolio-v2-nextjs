'use client';

import { useEffect, useState } from 'react';

import { themeInitScript } from '@/lib/theme';

let hasHydrated = false;
const SCRIPT_ID = 'theme-init';


export function ThemeScript() {
  const [render] = useState(
    () => typeof document === 'undefined' || (!hasHydrated && document.getElementById(SCRIPT_ID) !== null),
  );

  useEffect(() => {
    hasHydrated = true;
  }, []);

  return render ? <script id={SCRIPT_ID} dangerouslySetInnerHTML={{ __html: themeInitScript }} /> : null;
}
