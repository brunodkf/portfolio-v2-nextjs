import { useTranslations } from 'next-intl';

import { NavList } from './NavList';

export function SideNavigation() {
  const t = useTranslations('Hud');

  return (
    <nav
      aria-label={t('mainNav')}
      className="hidden lg:flex absolute inset-y-0 left-0 z-40 flex-col justify-center text-cinza dark:text-white"
    >
      <NavList variant="side" />
    </nav>
  );
}
