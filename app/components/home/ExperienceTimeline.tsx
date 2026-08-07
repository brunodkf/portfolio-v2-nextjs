'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import { EASE_OUT_SOFT, viewportOnce } from '@/lib/motion';

interface ExperienceItem {
    Title: string;
    Date: string;
    Role: string;
    Description: string;
    DescriptionMobile: string;
    Highlight: string;
    Muted: boolean;
}

const HexMarker = ({ muted, current, size }: { muted: boolean; current?: boolean; size: 'desktop' | 'mobile' }) => {
    const reduceMotion = useReducedMotion();
    const w = size === 'desktop' ? 15 : 13;
    const h = size === 'desktop' ? 17 : 15;
    return (
        <span className="relative inline-flex items-center justify-center" style={{ width: w, height: h }}>
            {current && !reduceMotion && (
                <motion.span
                    className="absolute rounded-full bg-laranja2/50"
                    style={{ width: w * 1.9, height: w * 1.9 }}
                    animate={{ scale: [0.6, 1.4, 0.6], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                />
            )}
            <svg
                width={w}
                height={h}
                viewBox="0 0 15 17"
                fill={muted ? 'rgba(223,142,58,.5)' : '#df8e3a'}
                className="relative"
                style={!muted ? { filter: 'drop-shadow(0 0 4px rgba(223,142,58,0.65))' } : undefined}
            >
                <path d="M7.5 0 L15 4.25 V12.75 L7.5 17 L0 12.75 V4.25 Z" />
            </svg>
        </span>
    );
};

const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
    if (!highlight || !text.includes(highlight)) return <>{text}</>;
    const [before, after] = text.split(highlight);
    return (
        <>
            {before}
            <strong className="text-preto dark:text-branco">{highlight}</strong>
            {after}
        </>
    );
};

const rowReveal = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const ExperienceTimeline = () => {
    const t = useTranslations('Experience');
    const items: ExperienceItem[] = t.raw('Items');
    const reduceMotion = useReducedMotion();

    const desktopTrackRef = useRef<HTMLDivElement>(null);
    const mobileTrackRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress: desktopProgress } = useScroll({
        target: desktopTrackRef,
        offset: ['start center', 'end center'],
    });
    const { scrollYProgress: mobileProgress } = useScroll({
        target: mobileTrackRef,
        offset: ['start center', 'end center'],
    });

    return (
        <section id="experiencia" className="scroll-mt-navbar px-4 lg:px-14 pt-16 lg:pt-[88px] pb-10">
            <div className="flex items-baseline gap-3 lg:gap-[18px] mb-8 lg:mb-12">
                <span className="font-mono text-xs lg:text-sm text-laranja tracking-[0.1em]">{t('Eyebrow')}</span>
                <h2 className="font-title font-bold text-[38px] lg:text-[56px] uppercase m-0 leading-[0.95] text-preto dark:text-branco">{t('Title')}</h2>
            </div>

            {/* Desktop */}
            <div ref={desktopTrackRef} className="hidden lg:block relative pl-[38px]">
                <div className="absolute left-[6px] top-2 bottom-2 w-0.5" style={{ background: 'linear-gradient(180deg, #df8e3a, rgba(223,142,58,.15))', opacity: 0.25 }} />
                {!reduceMotion && (
                    <motion.div
                        className="absolute left-[6px] top-2 bottom-2 w-0.5 bg-laranja2 rounded-full"
                        style={{ scaleY: desktopProgress, transformOrigin: 'top', boxShadow: '0 0 8px rgba(223,142,58,0.55)' }}
                    />
                )}
                {items.map((item, index) => (
                    <motion.div
                        key={item.Title}
                        variants={rowReveal}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                        transition={{ duration: 0.55, ease: EASE_OUT_SOFT, delay: index * 0.05 }}
                        className={`group relative ${index === items.length - 1 ? '' : 'mb-[38px]'} ${item.Muted ? 'opacity-[0.72]' : ''}`}
                    >
                        <span
                            aria-hidden="true"
                            className="absolute -inset-y-2 -left-3 -right-3 -z-10 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/[0.02] dark:bg-white/[0.03]"
                        />
                        <span className="absolute -left-[38px] top-1">
                            <HexMarker muted={item.Muted} current={index === 0} size="desktop" />
                        </span>
                        <div className="flex items-baseline justify-between">
                            <h3 className={`font-title uppercase m-0 transition-colors duration-300 group-hover:text-laranja ${item.Muted ? 'text-2xl text-preto/85 dark:text-branco/85' : 'text-3xl text-preto dark:text-branco'}`}>
                                {item.Title}
                            </h3>
                            <span className="font-mono text-xs text-preto/45 dark:text-branco/45">{item.Date}</span>
                        </div>
                        {item.Role && (
                            <p className="font-sans text-sm font-semibold text-laranja mt-1 mb-2">{item.Role}</p>
                        )}
                        <p className={`leading-[1.6] max-w-[820px] m-0 ${item.Muted ? 'text-[13.5px] text-preto/55 dark:text-branco/55 mt-1.5' : 'text-sm text-preto/72 dark:text-branco/72 mt-0'}`}>
                            <HighlightedText text={item.Description} highlight={item.Highlight} />
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Mobile */}
            <div ref={mobileTrackRef} className="lg:hidden relative pl-[30px]">
                <div className="absolute left-[5px] top-1.5 bottom-1.5 w-0.5" style={{ background: 'linear-gradient(180deg, #df8e3a, rgba(223,142,58,.15))', opacity: 0.25 }} />
                {!reduceMotion && (
                    <motion.div
                        className="absolute left-[5px] top-1.5 bottom-1.5 w-0.5 bg-laranja2 rounded-full"
                        style={{ scaleY: mobileProgress, transformOrigin: 'top' }}
                    />
                )}
                {items.filter((item) => !item.Muted).map((item, index, arr) => (
                    <motion.div
                        key={item.Title}
                        variants={rowReveal}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                        transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: index * 0.05 }}
                        className={`relative ${index === arr.length - 1 ? '' : 'mb-[26px]'}`}
                    >
                        <span className="absolute -left-[30px] top-[3px]">
                            <HexMarker muted={false} current={index === 0} size="mobile" />
                        </span>
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-title text-2xl uppercase m-0 text-preto dark:text-branco">{item.Title}</h3>
                            <span className="font-mono text-[10px] text-preto/45 dark:text-branco/45">{item.Date}</span>
                        </div>
                        <p className="text-xs font-semibold text-laranja mt-[3px] mb-1.5">{item.Role}</p>
                        <p className="text-[12.5px] leading-[1.5] text-preto/70 dark:text-branco/70 m-0">{item.DescriptionMobile}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ExperienceTimeline;
