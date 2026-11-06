'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { useNavItems } from './useNavItems';

const styles = {
  side: {
    list: 'space-y-1 line before:bg-cinza dark:before:bg-branco after:bg-cinza dark:after:bg-branco',
    link: 'uppercase text-sm transition-colors',
    active: 'text-cobre dark:text-laranja font-semibold',
    idle: 'text-cinza dark:text-white hover:text-cobre dark:hover:text-laranja',
    underline: 'bg-cobre dark:bg-laranja',
  },
  drawer: {
    list: 'flex flex-col items-center justify-center h-full gap-8 text-lg font-medium',
    link: 'uppercase text-lg transition-colors',
    active: 'font-bold underline underline-offset-4',
    idle: '',
    underline: 'bg-cinza dark:bg-laranja',
  },
} as const;

interface NavListProps {
  variant: keyof typeof styles;
  onNavigate?: () => void;
}

export function NavList({ variant, onNavigate }: NavListProps) {
  const items = useNavItems();
  const t = useTranslations('Hud');
  const s = styles[variant];

  return (
    <ul className={s.list}>
      {items.map((item, index) => (
        <motion.li
          key={item.key}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="relative group"
        >
          {item.kind === 'file' ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${s.link} ${s.idle}`}
              onClick={onNavigate}
            >
              {item.label}
              <span className="sr-only"> {t('pdfNewTab')}</span>
              <span className={`absolute left-0 bottom-0 w-0 h-[2px] ${s.underline} transition-all duration-300 group-hover:w-full`} />
            </a>
          ) : (
            <Link
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              className={`${s.link} ${item.active ? s.active : s.idle}`}
              onClick={onNavigate}
            >
              {item.label}
              {!item.active && (
                <span className={`absolute left-0 bottom-0 w-0 h-[2px] ${s.underline} transition-all duration-300 group-hover:w-full`} />
              )}
            </Link>
          )}
        </motion.li>
      ))}
    </ul>
  );
}
