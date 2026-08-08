'use client';

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from "@/context/ThemeProviderClient";

import { MdMenu, MdClose } from "react-icons/md";

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { EASE_OUT_SOFT } from '@/lib/motion';

import { menuItems } from '@/data/navigation';
import HexLogo from './home/HexLogo';

const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja/60 focus-visible:ring-offset-2 focus-visible:ring-offset-creme dark:focus-visible:ring-offset-[#1a1a1a] rounded-sm';

export const Navbar = () => {

    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as 'pt' | 'en';

    function switchLanguage(newLanguage: 'pt' | 'en') {
        if (newLanguage === locale) return;
        router.push(pathname, { locale: newLanguage })
    }

    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isDark = mounted ? resolvedTheme === 'dark' : true;

    const toggleSwitch = () => {
        setTheme(isDark ? 'light' : 'dark');
    }

    const t = useTranslations('Navbar')

    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState<string>('hero');
    const [elevated, setElevated] = useState(false);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, 'change', (latest) => {
        setElevated(latest > 24);
    });

    useEffect(() => {
        const sections = menuItems
            .map((item) => document.getElementById(item.hash))
            .filter((el): el is HTMLElement => el !== null);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 h-[78px] flex items-center justify-between px-4 lg:px-14 border-b bg-creme dark:bg-[#1a1a1a] transition-shadow duration-500 ${elevated
                ? 'border-black/[0.08] dark:border-white/[0.08] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.55)]'
                : 'border-black/[0.06] dark:border-white/[0.06] shadow-none'
                }`}
        >

            <a href="#hero" className={`flex items-center gap-3 ${focusRing}`} onClick={() => setIsOpen(false)}>
                <HexLogo width={26} height={30} className="lg:w-[30px] lg:h-[34px] text-preto dark:text-branco" />
                <span className="font-title text-[17px] lg:text-[19px] tracking-[0.02em] uppercase text-preto dark:text-branco">Bruno Furtado</span>
            </a>

            <nav className="hidden lg:flex items-center gap-[34px] font-mono text-xs tracking-[0.08em] uppercase">
                {menuItems.map((item) => (
                    <a
                        key={item.hash}
                        href={`#${item.hash}`}
                        className={`relative pb-2 transition-colors duration-200 ${focusRing} ${active === item.hash
                            ? 'text-laranja'
                            : 'text-preto/60 dark:text-branco/60 hover:text-laranja'
                            }`}
                    >
                        {t(item.name)}
                        {active === item.hash && (
                            <motion.span
                                layoutId="nav-active-indicator"
                                className="absolute left-0 -bottom-0 w-full h-[2px] bg-laranja rounded"
                                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            />
                        )}
                    </a>
                ))}
            </nav>

            <div className="flex items-center gap-4 lg:gap-4">

                <div className="hidden lg:flex items-center gap-1 font-mono text-xs">
                    <button
                        onClick={() => switchLanguage('pt')}
                        className={`${focusRing} transition-colors duration-200 ${locale === 'pt' ? 'text-preto/60 dark:text-branco/60' : 'text-preto/35 dark:text-branco/35 hover:text-laranja'}`}
                        aria-label="Português"
                    >
                        PT
                    </button>
                    <span className="text-preto/60 dark:text-branco/60">·</span>
                    <button
                        onClick={() => switchLanguage('en')}
                        className={`${focusRing} transition-colors duration-200 ${locale === 'en' ? 'text-preto/60 dark:text-branco/60' : 'text-preto/35 dark:text-branco/35 hover:text-laranja'}`}
                        aria-label="English"
                    >
                        EN
                    </button>
                </div>

                <button
                    onClick={() => switchLanguage(locale === 'pt' ? 'en' : 'pt')}
                    className={`lg:hidden font-mono text-xs text-laranja uppercase ${focusRing}`}
                    aria-label="Toggle language"
                >
                    {locale.toUpperCase()}
                </button>

                {!mounted ? (
                    <div className="hidden lg:block w-[46px] h-6 rounded-full bg-cinza" />
                ) : (
                    <button
                        className={`hidden lg:flex items-center rounded-full p-[2px] w-[46px] h-6 transition-transform duration-200 hover:scale-105 active:scale-95 ${focusRing} ${isDark ? 'bg-laranja2 justify-end' : 'bg-cinza justify-start'}`}
                        onClick={toggleSwitch}
                        aria-label="Toggle Theme"
                    >
                        <motion.div
                            className="w-5 h-5 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[10px]"
                            layout
                            transition={{ type: "spring", visualDuration: 0.2, bounce: 0.2 }}
                        >
                            {isDark ? '🌙' : '☀️'}
                        </motion.div>
                    </button>
                )}

                <span className={`hidden lg:inline-flex items-center gap-1.5 font-mono text-[11.5px] text-preto/75 dark:text-branco/75 border border-black/[0.14] dark:border-white/[0.14] rounded-[7px] px-[9px] py-[5px] transition-all duration-200 hover:border-laranja/40 hover:text-laranja`}>
                    ⌘K
                </span>

                <button
                    className={`lg:hidden text-laranja text-[22px] transition-transform duration-200 active:scale-90 ${focusRing}`}
                    aria-label="Open Menu"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <MdClose /> : <MdMenu />}
                </button>

                <div
                    className={`fixed top-[78px] left-0 w-full h-[calc(100vh-78px)] bg-creme dark:bg-[#1a1a1a] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        } transition-transform duration-300 ease-in-out lg:hidden`}
                >
                    <ul className="flex flex-col items-center justify-center h-full gap-8">
                        {menuItems.map((item, index) => (
                            <motion.li
                                key={item.hash}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.08, duration: 0.45, ease: EASE_OUT_SOFT }}
                            >
                                <a
                                    href={`#${item.hash}`}
                                    onClick={() => setIsOpen(false)}
                                    className={`font-title text-3xl uppercase tracking-wide transition-colors duration-200 ${focusRing} ${active === item.hash ? 'text-laranja' : 'text-preto dark:text-branco'
                                        }`}
                                >
                                    {t(item.name)}
                                </a>
                            </motion.li>
                        ))}
                        {mounted && (
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: menuItems.length * 0.08, duration: 0.45, ease: EASE_OUT_SOFT }}
                            >
                                <button
                                    className={`flex items-center rounded-full p-[2px] w-[46px] h-6 ${focusRing} ${isDark ? 'bg-laranja2 justify-end' : 'bg-cinza justify-start'}`}
                                    onClick={toggleSwitch}
                                    aria-label="Toggle Theme"
                                >
                                    <motion.div
                                        className="w-5 h-5 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[10px]"
                                        layout
                                        transition={{ type: "spring", visualDuration: 0.2, bounce: 0.2 }}
                                    >
                                        {isDark ? '🌙' : '☀️'}
                                    </motion.div>
                                </button>
                            </motion.li>
                        )}
                    </ul>
                </div>

            </div>
        </header>
    )
}
