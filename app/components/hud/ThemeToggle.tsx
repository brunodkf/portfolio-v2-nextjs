'use client';

import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { HiSun } from 'react-icons/hi2';
import { FaMoon } from 'react-icons/fa6';

import { applyTheme, readTheme, subscribeTheme } from '@/lib/theme';

const useIsDark = () => useSyncExternalStore(subscribeTheme, () => readTheme() === 'dark', () => true);

export function ThemeToggle() {
  const t = useTranslations('Hud');
  const isDark = useIsDark();

  return (
    <button
      type="button"
      aria-pressed={isDark}
      aria-label={t('darkTheme')}
      onClick={() => applyTheme(readTheme() === 'dark' ? 'light' : 'dark')}
      className="flex h-[28px] w-[55px] shrink-0 cursor-pointer items-center rounded-full bg-cinza py-[2px] pl-[2px] pr-[6px] transition-colors dark:bg-laranja"
    >
      <span
        aria-hidden="true"
        className="flex size-5 items-center justify-center transition-transform duration-300 ease-out dark:translate-x-[27px]"
      >
        <HiSun className="rounded-full bg-preto text-2xl text-laranja dark:hidden" />
        <FaMoon className="hidden rounded-full bg-laranja p-1 text-2xl text-cinza dark:block" />
      </span>
    </button>
  );
}
