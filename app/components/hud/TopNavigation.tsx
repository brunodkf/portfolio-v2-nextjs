'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { IoEarthOutline } from 'react-icons/io5';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import { Link, routing, usePathname } from '@/i18n/routing';
import { MobileNavigation } from './MobileNavigation';
import { ThemeToggle } from './ThemeToggle';

const languageNames = { pt: 'Português', en: 'English' } as const;

export function TopNavigation() {
  const t = useTranslations('Hud');
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  return (
    <header className="w-full z-50 absolute top-0 px-4 lg:px-0">
      <div className="container m-auto py-6 flex items-center justify-between">
        <Link href="/" aria-label={t('logoLabel')} className="relative z-50">
          <Image src="/logo.webp" alt="" className="max-w-16 brightness-0 dark:filter-none" width={100} height={50} priority />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={pathname}
            locale={otherLocale}
            hrefLang={otherLocale}
            aria-label={t('switchLanguage', { language: languageNames[otherLocale] })}
            className="flex items-center dark:text-laranja"
          >
            <IoEarthOutline aria-hidden="true" className="text-xl mr-1" />
            <span className="uppercase">{locale}</span>
            <MdOutlineKeyboardArrowDown aria-hidden="true" />
          </Link>

          <ThemeToggle />

          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
