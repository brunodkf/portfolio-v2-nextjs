'use client';

import { usePathname } from '@/i18n/routing';
import { SkillList } from '../SkillList';

export function HudFooter() {
  const isHome = usePathname() === '/';

  return (
    <footer className="w-screen h-[50px] absolute bottom-0">
      <div className="hidden container m-auto lg:flex items-center justify-between">
        <p className="font-title text-cinza dark:text-branco">Memento Mori | Memento Vivere</p>

        {isHome && <SkillList />}
      </div>
    </footer>
  );
}
