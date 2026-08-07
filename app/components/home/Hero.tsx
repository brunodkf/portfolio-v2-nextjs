'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroScene from './HeroScene';
import DecorativeHexagon from './DecorativeHexagon';
import LiveBadge from './LiveBadge';
import { resumePath } from '@/data/navigation';
import { EASE_OUT_EXPO } from '@/lib/motion';

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
};

const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja/60 focus-visible:ring-offset-2 focus-visible:ring-offset-creme dark:focus-visible:ring-offset-[#1a1a1a]';

const ctaPrimary =
    `group relative overflow-hidden bg-laranja2 text-[#1a1a1a] font-semibold text-[15px] rounded-[10px] inline-flex items-center gap-[9px] justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(223,142,58,0.5)] active:translate-y-0 active:scale-[0.98] ${focusRing}`;

const ctaSecondary =
    `border border-black/20 dark:border-white/20 text-preto dark:text-branco font-medium text-[15px] rounded-[10px] inline-flex items-center gap-[9px] justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-laranja/50 hover:bg-laranja/[0.06] active:translate-y-0 active:scale-[0.98] ${focusRing}`;

const Sheen = () => (
    <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[900ms] ease-out"
        style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)' }}
    />
);

const Hero = () => {
    const t = useTranslations('Hero');

    return (
        <section id="hero" className="scroll-mt-navbar relative overflow-hidden">

            {/* Desktop */}
            <div className="hidden lg:flex relative items-center min-h-[560px] lg:min-h-[86vh] lg:max-h-[1040px] px-14 pt-24 pb-[70px]">
                <HeroScene className="absolute -right-[2%] -top-[6%] w-[clamp(820px,74vw,2000px)] h-[clamp(760px,84vh,1620px)]" />

                <motion.div
                    className="relative max-w-[720px] flex flex-col gap-[22px]"
                    initial="hidden"
                    animate="show"
                    transition={{ staggerChildren: 0.12 }}
                >
                    <motion.span
                        variants={fadeUp}
                        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                        className="inline-flex items-center gap-[9px] font-mono text-xs uppercase tracking-[0.1em] text-laranja bg-laranja/10 border border-laranja/25 rounded-[20px] px-[14px] py-[7px] w-fit"
                    >
                        <LiveBadge label={t('Badge')} />
                        {t('Badge')}
                    </motion.span>

                    <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}>
                        <h1 className="font-title font-bold text-[118px] leading-[0.9] tracking-[-0.01em] uppercase m-0 text-preto dark:text-branco">
                            Bruno<br />Furtado
                        </h1>
                        <p className="font-mono text-[15px] tracking-[0.06em] text-preto/60 dark:text-branco/60 mt-[18px]">
                            {t('Role')}
                        </p>
                    </motion.div>

                    <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }} className="font-sans text-[22px] leading-[1.5] text-preto/90 dark:text-branco/90 m-0 max-w-[560px]">
                        {t('Tagline')}
                    </motion.p>

                    <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }} className="flex gap-3.5 mt-1.5">
                        <a href="#casos" className={`${ctaPrimary} px-[26px] py-[15px]`}>
                            <Sheen />
                            <span className="relative">{t('CTAPrimary')}</span>
                            <span className="relative text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                        <Link
                            href={resumePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${ctaSecondary} px-[26px] py-[15px]`}
                        >
                            {t('CTASecondary')} <span>↓</span>
                        </Link>
                    </motion.div>

                    <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }} className="font-mono text-xs text-preto/40 dark:text-branco/40 mt-[14px] tracking-[0.05em]">
                        {t('Location')}
                    </motion.p>
                </motion.div>
            </div>

            {/* Mobile */}
            <div className="lg:hidden relative px-[22px] pt-6 pb-[34px]">
                <DecorativeHexagon width={220} height={240} opacity={0.09} className="absolute -right-[30px] top-0" />

                <motion.div
                    className="relative"
                    initial="hidden"
                    animate="show"
                    transition={{ staggerChildren: 0.12 }}
                >
                    <motion.span
                        variants={fadeUp}
                        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                        className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-laranja bg-laranja/10 border border-laranja/25 rounded-[20px] px-3 py-1.5"
                    >
                        <LiveBadge label={t('BadgeMobile')} size="mobile" />
                        {t('BadgeMobile')}
                    </motion.span>

                    <motion.h1 variants={fadeUp} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }} className="font-title font-bold text-[70px] leading-[0.88] uppercase mt-[22px] text-preto dark:text-branco">
                        Bruno<br />Furtado
                    </motion.h1>

                    <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }} className="font-mono text-[11.5px] text-preto/60 dark:text-branco/60 mt-3.5">
                        {t('RoleMobile')}
                    </motion.p>

                    <motion.p variants={fadeUp} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }} className="text-[17px] leading-[1.5] text-preto/90 dark:text-branco/90 mt-[18px]">
                        {t('TaglineMobile')}
                    </motion.p>

                    <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: EASE_OUT_EXPO }} className="flex flex-col gap-[11px] mt-6">
                        <a href="#casos" className={`${ctaPrimary} py-[15px]`}>
                            <Sheen />
                            <span className="relative">{t('CTAPrimary')} →</span>
                        </a>
                        <Link
                            href={resumePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${ctaSecondary} py-[15px]`}
                        >
                            {t('CTASecondary')} ↓
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
