'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import React from 'react'
import Link from 'next/link';

import { menuItems } from '@/data/navigation';


const ListaRouters = () => {

  const t = useTranslations('Navbar')
  const { locale } = useParams();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname === `/${locale}${path}`;
  };

  return (
    <ul className="space-y-1 line before:bg-cinza dark:before:bg-branco after:bg-cinza dark:after:bg-branco">
      {menuItems.map((item, index) => {
        const active = item.name !== 'resume' && isActive(item.path);
        return (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="relative group"
          >
            <Link
              href={item.name === 'resume' ? item.path : `/${locale}${item.path}`}
              aria-label={`${t("goTo")} ${t(item.name)}`}
              target={item.name === 'resume' ? '_blank' : undefined}
              rel={item.name === 'resume' ? 'noopener noreferrer' : undefined}
              className={`uppercase text-sm transition-colors ${
                active
                  ? 'text-laranja font-semibold'
                  : 'text-cinza dark:text-white hover:text-laranja dark:hover:text-laranja'
              }`}
            >
              {t(item.name)}
              {!active && (
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-laranja transition-all duration-300 group-hover:w-full" />
              )}
            </Link>
          </motion.li>
        );
      })}
    </ul>
  )
}

export default ListaRouters
