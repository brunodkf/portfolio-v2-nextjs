'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { socialLinks } from '@/config/navigation';

export function SocialNavigation() {
  const t = useTranslations('Hud');

  return (
    <nav
      aria-label={t('socialNav')}
      className="hidden w-10 lg:flex flex-col justify-center items-center absolute inset-y-0 right-0 z-40 text-cinza dark:text-white"
    >
      <ul className="space-y-2 line before:right-2.5 after:right-2.5 before:bg-cinza dark:before:bg-branco after:bg-cinza dark:after:bg-branco">
        {socialLinks.map(({ name, href, icon: Icon }, index) => (
          <motion.li
            key={name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="relative rounded hover:bg-laranja hover:text-cinza focus-within:bg-laranja focus-within:text-cinza"
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('visitProfile', { name })} ${t('newTab')}`}
              title={name}
              className="block p-0.5 text-2xl"
            >
              <Icon aria-hidden="true" />
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
