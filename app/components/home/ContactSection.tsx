'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import DecorativeHexagon from './DecorativeHexagon';
import CornerGlow from './CornerGlow';
import LiveBadge from './LiveBadge';
import { resumePath } from '@/data/navigation';
import { socials, email } from '@/data/socials';
import { EASE_OUT_EXPO, EASE_OUT_SOFT, viewportOnce } from '@/lib/motion';

const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja/60 focus-visible:ring-offset-2 focus-visible:ring-offset-creme dark:focus-visible:ring-offset-[#1a1a1a]';

const ctaPrimary =
    `group relative overflow-hidden bg-laranja2 text-[#1a1a1a] font-semibold rounded-[10px] inline-flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(223,142,58,0.5)] active:translate-y-0 active:scale-[0.98] ${focusRing}`;

const ctaSecondary =
    `border border-black/20 dark:border-white/20 text-preto dark:text-branco font-medium rounded-[10px] inline-flex items-center justify-center transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-laranja/50 hover:bg-laranja/[0.06] active:translate-y-0 active:scale-[0.98] ${focusRing}`;

const Sheen = () => (
    <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[900ms] ease-out"
        style={{ background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)' }}
    />
);

const ContactSection = () => {
    const t = useTranslations('Contact');
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
        } catch {
            // clipboard unavailable — no-op
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contato" className="scroll-mt-navbar px-4 lg:px-14 py-10 lg:py-[70px]">

            {/* Desktop */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
                className="hidden lg:block relative overflow-hidden border border-laranja2/25 rounded-[20px] px-14 py-[60px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_60px_-36px_rgba(0,0,0,0.5)]"
                style={{ background: 'radial-gradient(circle at 20% 0%, rgba(223,142,58,.14), rgba(255,255,255,.015))' }}
            >
                <DecorativeHexagon width={260} height={300} opacity={0.08} strokeWidth={1.5} className="absolute right-[30px] -bottom-[60px]" />
                <CornerGlow className="absolute -right-4 -top-4 opacity-70" />
                <div className="relative max-w-[760px]">
                    <span className="inline-flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.1em] text-laranja mb-5">
                        <LiveBadge label={t('Badge')} />
                        {t('Badge')}
                    </span>
                    <h2 className="font-title font-bold text-[64px] uppercase m-0 mb-[14px] leading-[0.95] text-preto dark:text-branco">
                        {t('TitleLine1')}<br />{t('TitleLine2')}
                    </h2>
                    <p className="text-[17px] leading-[1.6] text-preto/75 dark:text-branco/75 mb-8 max-w-[520px]">{t('Paragraph')}</p>
                    <div className="flex gap-3.5 items-center flex-wrap">
                        <button
                            onClick={handleCopy}
                            className={`${ctaPrimary} gap-2.5 px-[26px] py-[15px] text-[15px]`}
                        >
                            <Sheen />
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={copied ? 'copied' : 'idle'}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                                    className="relative inline-flex items-center gap-2.5"
                                >
                                    {copied ? t('CopiedLabel') : t('Email')}
                                    {!copied && (
                                        <span className="font-mono text-[11px] bg-black/[0.15] px-[7px] py-[3px] rounded-[5px]">{t('CopyLabel')}</span>
                                    )}
                                </motion.span>
                            </AnimatePresence>
                        </button>
                        <Link href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={`${ctaSecondary} px-6 py-[15px] text-[15px]`}>
                            {t('LinkedIn')}
                        </Link>
                        <Link href={resumePath} target="_blank" rel="noopener noreferrer" className={`${ctaSecondary} px-6 py-[15px] text-[15px]`}>
                            {t('CV')}
                        </Link>
                        <Link href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className={`group/link relative text-preto/50 dark:text-branco/50 text-sm hover:text-laranja transition-colors duration-200 w-fit ${focusRing}`}>
                            {t('Or')}
                            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-laranja transition-all duration-300 ease-out group-hover/link:w-full" />
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Mobile */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
                className="lg:hidden relative overflow-hidden border border-laranja2/25 rounded-[18px] px-6 py-8"
                style={{ background: 'radial-gradient(circle at 20% 0%, rgba(223,142,58,.12), rgba(255,255,255,.015))' }}
            >
                <DecorativeHexagon width={180} height={200} opacity={0.09} strokeWidth={1.5} className="absolute -right-10 -bottom-[50px]" />
                <span className="relative inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-laranja mb-4">
                    <LiveBadge label={t('BadgeMobile')} size="mobile" />
                    {t('BadgeMobile')}
                </span>
                <h2 className="relative font-title font-bold text-[44px] uppercase m-0 mb-3 leading-[0.92] text-preto dark:text-branco">
                    {t('TitleMobile')}
                </h2>
                <p className="relative text-sm leading-[1.55] text-preto/75 dark:text-branco/75 mb-6">{t('ParagraphMobile')}</p>
                <div className="relative flex flex-col gap-[10px]">
                    <button
                        onClick={handleCopy}
                        className={`${ctaPrimary} gap-2 py-[14px] text-sm`}
                    >
                        <Sheen />
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={copied ? 'copied' : 'idle'}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                                className="relative inline-flex items-center gap-2"
                            >
                                {copied ? t('CopiedLabel') : t('CopyButtonMobile')}
                                {!copied && <span className="font-mono text-[10px] bg-black/[0.15] px-1.5 py-0.5 rounded">⧉</span>}
                            </motion.span>
                        </AnimatePresence>
                    </button>
                    <div className="flex gap-[10px]">
                        <Link href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={`${ctaSecondary} flex-1 py-[13px] text-sm`}>
                            {t('LinkedIn')}
                        </Link>
                        <Link href={resumePath} target="_blank" rel="noopener noreferrer" className={`${ctaSecondary} flex-1 py-[13px] text-sm`}>
                            {t('CVMobile')}
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ContactSection;
