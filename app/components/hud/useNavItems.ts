'use client';

import { useLocale, useTranslations } from 'next-intl';

import { isActivePath, navItems, type NavKey } from '@/config/navigation';
import { resumePath } from '@/config/site';
import { usePathname } from '@/i18n/routing';

export type NavItem =
  | { key: NavKey; label: string; kind: 'page'; href: string; active: boolean }
  | { key: NavKey; label: string; kind: 'file'; href: string; active: false };

export function useNavItems(): NavItem[] {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();

  return navItems.map((item) =>
    item.href === null
      ? { key: item.key, label: t(item.key), kind: 'file', href: resumePath[locale], active: false }
      : { key: item.key, label: t(item.key), kind: 'page', href: item.href, active: isActivePath(pathname, item.href) },
  );
}
