'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MdClose, MdMenu } from 'react-icons/md';

import { usePathname } from '@/i18n/routing';
import { NavList } from './NavList';

const FOCUSABLE = 'a[href], button:not([disabled])';

export function MobileNavigation() {
  const t = useTranslations('Hud');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerId = useId();
  const pathname = usePathname();

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    document.getElementById(drawerId)?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusables = Array.from(containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => desktop.matches && close(false);

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onResize);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onResize);
    };
  }, [open, close, drawerId]);

  return (
    <div ref={containerRef} className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={drawerId}
        aria-label={open ? t('closeMenu') : t('openMenu')}
        onClick={() => (open ? close() : setOpen(true))}
        className="relative z-50 flex items-center text-4xl dark:text-laranja"
      >
        {open ? <MdClose aria-hidden="true" /> : <MdMenu aria-hidden="true" />}
      </button>

      <nav
        id={drawerId}
        aria-label={t('mainNav')}
        inert={!open}
        className={`fixed inset-0 z-40 h-dvh w-full bg-laranja text-preto dark:bg-dark-global dark:text-branco
          duration-300 ease-in-out
          ${open
            ? 'visible translate-x-0 transition-transform'
            : 'invisible translate-x-full transition-[transform,visibility]'}`}
      >
        <NavList variant="drawer" onNavigate={() => close(false)} />
      </nav>
    </div>
  );
}
