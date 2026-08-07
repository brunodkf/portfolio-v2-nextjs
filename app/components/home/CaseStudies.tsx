'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CountUp from './CountUp';
import { EASE_OUT_SOFT, viewportOnce } from '@/lib/motion';

interface CaseStudy {
    Tags: string[];
    TagsMobile?: string[];
    Name: string;
    Domain: string;
    Meta: string;
    MetaMobile?: string;
    ProblemLabel: string;
    Problem: string;
    ProblemMobile?: string;
    DecisionLabel: string;
    Decision: string;
    Stat1Value: string;
    Stat1Label: string;
    Stat1LabelMobile?: string;
    Stat2Value: string;
    Stat2Label: string;
    Stat2LabelMobile?: string;
    ViewRepoMobile?: string;
    Link: string;
}

interface CompactCase {
    Name: string;
    Meta: string;
    Link: string;
}

const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laranja/60 focus-visible:ring-offset-2 focus-visible:ring-offset-creme dark:focus-visible:ring-offset-[#1a1a1a]';

const cardReveal = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const cardTransition = { duration: 0.65, ease: EASE_OUT_SOFT };

const anchorCardClass =
    'group border border-black/[0.09] dark:border-white/[0.09] rounded-2xl bg-black/[0.02] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_40px_-30px_rgba(0,0,0,0.55)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-30px_rgba(0,0,0,0.65)] transition-all duration-500 ease-out hover:border-laranja/25 hover:shadow-[0_24px_48px_-24px_rgba(223,142,58,0.25)]';

const imageZoom = 'object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]';

const BrowserChrome = ({ domain, showDomain = true, height = 34 }: { domain: string; showDomain?: boolean; height?: number }) => (
    <div className="bg-[#2c2c2c] flex items-center gap-[7px] px-3.5" style={{ height }}>
        <span className="w-[11px] h-[11px] rounded-full bg-[#e06b5e]" />
        <span className="w-[11px] h-[11px] rounded-full bg-[#e0b24e]" />
        <span className="w-[11px] h-[11px] rounded-full bg-[#6fce7e]" />
        {showDomain && <span className="ml-3 font-mono text-[11px] text-branco/40">{domain}</span>}
    </div>
);

const CaseStudies = () => {
    const t = useTranslations('CaseStudies');
    const case1: CaseStudy = t.raw('Case1');
    const case2: CaseStudy = t.raw('Case2');
    const compact1: CompactCase = t.raw('Compact1');
    const compact2: CompactCase = t.raw('Compact2');

    return (
        <section id="casos" className="scroll-mt-navbar px-4 lg:px-14 pt-16 lg:pt-[88px] pb-10">

            {/* Header */}
            <div className="hidden lg:flex items-end justify-between mb-11">
                <div className="flex items-baseline gap-[18px]">
                    <span className="font-mono text-sm text-laranja tracking-[0.1em]">{t('Eyebrow')}</span>
                    <h2 className="font-title font-bold text-[56px] uppercase m-0 leading-[0.95] text-preto dark:text-branco">{t('Title')}</h2>
                </div>
                <p className="font-sans text-sm text-preto/50 dark:text-branco/50 m-0 max-w-[320px] text-right">{t('Intro')}</p>
            </div>
            <div className="lg:hidden flex items-baseline gap-3 mb-[22px]">
                <span className="font-mono text-xs text-laranja">{t('Eyebrow')}</span>
                <h2 className="font-title font-bold text-[38px] uppercase m-0 text-preto dark:text-branco">{t('Title')}</h2>
            </div>

            {/* Anchor Case 1 — StartCrypto */}
            <motion.div
                variants={cardReveal}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={cardTransition}
                className={`hidden lg:grid grid-cols-[1.25fr_1fr] gap-11 items-center p-9 mb-[26px] ${anchorCardClass}`}
            >
                <div className="rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08]">
                    <BrowserChrome domain={case1.Domain} />
                    <div className="relative h-[340px] overflow-hidden">
                        <Image src="/projects/startcrypto.webp" alt={`Screenshot ${case1.Name}`} fill className={imageZoom} />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2 flex-wrap">
                        {case1.Tags.map((tag) => (
                            <span key={tag} className="font-mono text-[10.5px] text-preto/60 dark:text-branco/60 border border-black/[0.14] dark:border-white/[0.14] rounded-md px-[9px] py-1">{tag}</span>
                        ))}
                    </div>
                    <div>
                        <h3 className="font-title text-[38px] uppercase m-0 leading-none text-preto dark:text-branco">{case1.Name}</h3>
                        <p className="font-mono text-[11.5px] text-laranja mt-1.5 tracking-[0.05em]">{case1.Meta}</p>
                    </div>
                    <p className="text-[14.5px] leading-[1.6] text-preto/80 dark:text-branco/80 m-0">
                        <span className="text-preto/45 dark:text-branco/45 font-mono text-[11px] tracking-[0.06em] block mb-[3px]">{case1.ProblemLabel}</span>
                        {case1.Problem}
                    </p>
                    <p className="text-[14.5px] leading-[1.6] text-preto/80 dark:text-branco/80 m-0">
                        <span className="text-preto/45 dark:text-branco/45 font-mono text-[11px] tracking-[0.06em] block mb-[3px]">{case1.DecisionLabel}</span>
                        {case1.Decision}
                    </p>
                    <div className="flex gap-[30px] mt-1">
                        <div>
                            <CountUp value={case1.Stat1Value} className="font-title text-[40px] text-laranja leading-none tabular-nums" />
                            <div className="font-mono text-[10px] text-preto/50 dark:text-branco/50 mt-0.5">{case1.Stat1Label}</div>
                        </div>
                        <div>
                            <CountUp value={case1.Stat2Value} className="font-title text-[40px] text-laranja leading-none tabular-nums" />
                            <div className="font-mono text-[10px] text-preto/50 dark:text-branco/50 mt-0.5">{case1.Stat2Label}</div>
                        </div>
                    </div>
                    <div className="flex gap-5 mt-1.5 font-mono text-xs">
                        <Link href={case1.Link} target="_blank" rel="noopener noreferrer" className={`group/link relative text-laranja w-fit ${focusRing}`}>
                            {t('ViewSite')}
                            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-laranja transition-all duration-300 ease-out group-hover/link:w-full" />
                        </Link>
                        <span className="text-preto/55 dark:text-branco/55">{t('ViewRepo')}</span>
                    </div>
                </div>
            </motion.div>

            {/* Anchor Case 2 — LA Medic Rio (reversed) */}
            <motion.div
                variants={cardReveal}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={cardTransition}
                className={`hidden lg:grid grid-cols-[1fr_1.25fr] gap-11 items-center p-9 mb-[26px] ${anchorCardClass}`}
            >
                <div className="flex flex-col gap-4 order-1">
                    <div className="flex gap-2 flex-wrap">
                        {case2.Tags.map((tag) => (
                            <span key={tag} className="font-mono text-[10.5px] text-preto/60 dark:text-branco/60 border border-black/[0.14] dark:border-white/[0.14] rounded-md px-[9px] py-1">{tag}</span>
                        ))}
                    </div>
                    <div>
                        <h3 className="font-title text-[38px] uppercase m-0 leading-none text-preto dark:text-branco">{case2.Name}</h3>
                        <p className="font-mono text-[11.5px] text-laranja mt-1.5 tracking-[0.05em]">{case2.Meta}</p>
                    </div>
                    <p className="text-[14.5px] leading-[1.6] text-preto/80 dark:text-branco/80 m-0">
                        <span className="text-preto/45 dark:text-branco/45 font-mono text-[11px] tracking-[0.06em] block mb-[3px]">{case2.ProblemLabel}</span>
                        {case2.Problem}
                    </p>
                    <p className="text-[14.5px] leading-[1.6] text-preto/80 dark:text-branco/80 m-0">
                        <span className="text-preto/45 dark:text-branco/45 font-mono text-[11px] tracking-[0.06em] block mb-[3px]">{case2.DecisionLabel}</span>
                        {case2.Decision}
                    </p>
                    <div className="flex gap-[30px] mt-1">
                        <div>
                            <CountUp value={case2.Stat1Value} className="font-title text-[40px] text-laranja leading-none tabular-nums" />
                            <div className="font-mono text-[10px] text-preto/50 dark:text-branco/50 mt-0.5">{case2.Stat1Label}</div>
                        </div>
                        <div>
                            <CountUp value={case2.Stat2Value} className="font-title text-[40px] text-laranja leading-none tabular-nums" />
                            <div className="font-mono text-[10px] text-preto/50 dark:text-branco/50 mt-0.5">{case2.Stat2Label}</div>
                        </div>
                    </div>
                    <div className="flex gap-5 mt-1.5 font-mono text-xs">
                        <Link href={case2.Link} target="_blank" rel="noopener noreferrer" className={`group/link relative text-laranja w-fit ${focusRing}`}>
                            {t('ViewSite')}
                            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-laranja transition-all duration-300 ease-out group-hover/link:w-full" />
                        </Link>
                        <span className="text-preto/55 dark:text-branco/55">{t('ViewRepo')}</span>
                    </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] order-2">
                    <BrowserChrome domain={case2.Domain} />
                    <div className="relative h-[340px] overflow-hidden">
                        <Image src="/projects/lamediclg.webp" alt={`Screenshot ${case2.Name}`} fill className={imageZoom} />
                    </div>
                </div>
            </motion.div>

            {/* Compact grid — desktop */}
            <motion.div
                className="hidden lg:grid grid-cols-2 gap-[22px] mt-2"
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            >
                {[
                    { data: compact1, image: '/projects/streaminglg.webp' },
                    { data: compact2, image: '/projects/newlifelg.webp' },
                ].map(({ data, image }) => (
                    <motion.div key={data.Name} variants={cardReveal} transition={cardTransition}>
                        <Link
                            href={data.Link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group block overflow-hidden ${focusRing} ${anchorCardClass.replace('rounded-2xl', 'rounded-[14px]')} hover:-translate-y-1`}
                        >
                            <div className="relative h-[170px] overflow-hidden">
                                <Image src={image} alt={`Screenshot ${data.Name}`} fill className={imageZoom} />
                            </div>
                            <div className="p-[22px] flex justify-between items-start">
                                <div>
                                    <h4 className="font-title text-[26px] uppercase m-0 text-preto dark:text-branco">{data.Name}</h4>
                                    <p className="font-mono text-[10.5px] text-preto/45 dark:text-branco/45 mt-[5px]">{data.Meta}</p>
                                </div>
                                <span className="font-mono text-xs text-laranja opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">{t('ViewCase')}</span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* Mobile: anchor case 1 + compact list */}
            <div className="lg:hidden flex flex-col gap-[18px]">
                <div className="border border-black/[0.09] dark:border-white/[0.09] rounded-[14px] overflow-hidden bg-black/[0.02] dark:bg-white/[0.02]">
                    <BrowserChrome domain={case1.Domain} showDomain={false} height={30} />
                    <div className="relative h-[150px]">
                        <Image src="/projects/startcrypto.webp" alt={`Screenshot ${case1.Name}`} fill className="object-cover object-top" />
                    </div>
                    <div className="p-5">
                        <div className="flex gap-1.5 mb-2.5">
                            {(case1.TagsMobile ?? case1.Tags).map((tag) => (
                                <span key={tag} className="font-mono text-[9.5px] text-preto/60 dark:text-branco/60 border border-black/[0.14] dark:border-white/[0.14] rounded px-[7px] py-[3px]">{tag}</span>
                            ))}
                        </div>
                        <h3 className="font-title text-[30px] uppercase m-0 text-preto dark:text-branco">{case1.Name}</h3>
                        <p className="font-mono text-[10px] text-laranja mt-[5px] mb-3">{case1.MetaMobile ?? case1.Meta}</p>
                        <p className="text-[13px] leading-[1.55] text-preto/75 dark:text-branco/75 mb-3.5">
                            <span className="text-preto/45 dark:text-branco/45 font-mono text-[9.5px] block">{case1.ProblemLabel}</span>
                            {case1.ProblemMobile ?? case1.Problem}
                        </p>
                        <div className="flex gap-6">
                            <div>
                                <CountUp value={case1.Stat1Value} className="font-title text-[30px] text-laranja leading-none tabular-nums" />
                                <div className="font-mono text-[9px] text-preto/50 dark:text-branco/50">{case1.Stat1LabelMobile ?? case1.Stat1Label}</div>
                            </div>
                            <div>
                                <CountUp value={case1.Stat2Value} className="font-title text-[30px] text-laranja leading-none tabular-nums" />
                                <div className="font-mono text-[9px] text-preto/50 dark:text-branco/50">{case1.Stat2LabelMobile ?? case1.Stat2Label}</div>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-3.5 font-mono text-[11px]">
                            <Link href={case1.Link} target="_blank" rel="noopener noreferrer" className={`text-laranja ${focusRing}`}>{t('ViewSite')}</Link>
                            <span className="text-preto/50 dark:text-branco/50">{case1.ViewRepoMobile}</span>
                        </div>
                    </div>
                </div>

                {[
                    { name: case2.Name, meta: case2.MetaMobile ?? case2.Meta, link: case2.Link, image: '/projects/lamedic.webp' },
                    { name: compact1.Name, meta: compact1.Meta, link: compact1.Link, image: '/projects/streaming.webp' },
                    { name: compact2.Name, meta: compact2.Meta, link: compact2.Link, image: '/projects/newlife.webp' },
                ].map((item) => (
                    <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={item.name}
                        className={`border border-black/[0.09] dark:border-white/[0.09] rounded-[14px] overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] transition-transform duration-200 active:scale-[0.98] ${focusRing}`}
                    >
                        <div className="relative h-[120px]">
                            <Image src={item.image} alt={`Screenshot ${item.name}`} fill className="object-cover object-top" />
                        </div>
                        <div className="px-5 py-4 flex justify-between items-center">
                            <div>
                                <h4 className="font-title text-2xl uppercase m-0 text-preto dark:text-branco">{item.name}</h4>
                                <p className="font-mono text-[9.5px] text-preto/45 dark:text-branco/45 mt-1">{item.meta}</p>
                            </div>
                            <span className="text-laranja font-mono">→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CaseStudies;
