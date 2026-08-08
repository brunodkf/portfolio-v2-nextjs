'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { EASE_OUT_SOFT, fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import CornerGlow from './CornerGlow';

interface WorkItem {
    Number: string;
    Title: string;
    Description: string;
}

interface Testimonial {
    Name: string;
    Position: string;
    Quote: string;
}

const initials = (name: string) =>
    name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();

const cardTransition = { duration: 0.6, ease: EASE_OUT_SOFT };

const AboutSection = () => {
    const t = useTranslations('About');
    const paragraphs: string[] = t.raw('Paragraphs');
    const workItems: WorkItem[] = t.raw('ComoTrabalho.Items');
    const tags: string[] = t.raw('Tags');
    const tTestimonials = useTranslations('Testimonials');
    const testimonials: Testimonial[] = tTestimonials.raw('Items');

    return (
        <section id="sobre" className="scroll-mt-navbar px-4 lg:px-14 pt-16 lg:pt-[88px] pb-10">
            <div className="flex items-baseline gap-3 lg:gap-[18px] mb-8 lg:mb-11">
                <span className="font-mono text-xs lg:text-sm text-laranja tracking-[0.1em]">{t('Eyebrow')}</span>
                <h2 className="font-title font-bold text-[38px] lg:text-[56px] uppercase m-0 leading-[0.95] text-preto dark:text-branco">{t('Title')}</h2>
            </div>

            {/* Desktop */}
            <motion.div
                className="hidden lg:grid grid-cols-[1.1fr_0.9fr] gap-[60px]"
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={staggerContainer(0.15)}
            >
                <motion.div variants={fadeUp} transition={cardTransition}>
                    <p className="text-xl leading-[1.6] text-preto/92 dark:text-branco/92 mb-5">{paragraphs[0]}</p>
                    <p className="text-[15px] leading-[1.7] text-preto/68 dark:text-branco/68 mb-4">{paragraphs[1]}</p>
                    <p className="text-[15px] leading-[1.7] text-preto/68 dark:text-branco/68">{paragraphs[2]}</p>
                </motion.div>
                <motion.div variants={fadeUp} transition={cardTransition}>
                    <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-laranja mb-[18px]">{t('ComoTrabalho.Label')}</p>
                    <div className="flex flex-col gap-[14px]">
                        {workItems.map((item) => (
                            <div key={item.Number} className="group flex gap-3 items-start w-fit transition-transform duration-300 ease-out hover:translate-x-1">
                                <span className="text-laranja2 font-mono text-xs mt-0.5 transition-colors duration-300 group-hover:text-laranja">{item.Number}</span>
                                <span className="text-sm leading-[1.5] text-preto/80 dark:text-branco/80">
                                    <strong className="text-preto dark:text-branco">{item.Title}</strong> — {item.Description}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-7 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span key={tag} className="font-mono text-[11px] text-preto/65 dark:text-branco/65 border border-black/[0.13] dark:border-white/[0.13] rounded-md px-[10px] py-[5px] transition-colors duration-200 hover:border-laranja/40 hover:text-laranja">{tag}</span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Desktop testimonials */}
            <motion.div
                className="hidden lg:grid grid-cols-2 gap-[22px] mt-[52px]"
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={staggerContainer(0.12)}
            >
                {testimonials.map((item, index) => (
                    <motion.div
                        key={item.Name}
                        variants={fadeUp}
                        transition={cardTransition}
                        className="group relative overflow-hidden border border-black/[0.09] dark:border-white/[0.09] rounded-2xl p-[26px] bg-black/[0.02] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-laranja/25 hover:shadow-[0_24px_48px_-24px_rgba(223,142,58,0.22)]"
                    >
                        {index === testimonials.length - 1 && (
                            <CornerGlow className="absolute -right-6 -bottom-6 opacity-0 dark:opacity-70 pointer-events-none" />
                        )}
                        <span
                            aria-hidden="true"
                            className="absolute -top-2 right-3 font-title text-[110px] leading-none text-laranja/[0.06] select-none pointer-events-none"
                        >
                            &rdquo;
                        </span>
                        <p className="relative text-[14.5px] leading-[1.65] text-preto/82 dark:text-branco/82 mb-[18px]">&quot;{item.Quote}&quot;</p>
                        <div className="relative flex items-center gap-3">
                            <span
                                className="relative w-[38px] h-[38px] rounded-full flex items-center justify-center font-title text-[15px] text-[#1a1a1a] overflow-hidden transition-transform duration-300 group-hover:scale-105"
                                style={{ background: 'linear-gradient(135deg, #df8e3a, #dfa47d)' }}
                            >
                                <span className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.45), transparent 60%)' }} />
                                <span className="relative">{initials(item.Name)}</span>
                            </span>
                            <div>
                                <div className="text-[13px] font-semibold text-preto dark:text-branco">{item.Name}</div>
                                <div className="font-mono text-[10.5px] text-preto/50 dark:text-branco/50">
                                    {item.Position} &nbsp;·&nbsp; <span className="text-laranja">in →</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Mobile */}
            <div className="lg:hidden">
                <p className="text-base leading-[1.55] text-preto/90 dark:text-branco/90 mb-4">{t('ParagraphMobile')}</p>
                <div className="flex flex-col gap-[10px]">
                    {workItems.map((item) => (
                        <div key={item.Number} className="flex gap-[10px]">
                            <span className="text-laranja2 font-mono text-[11px]">{item.Number}</span>
                            <span className="text-[12.5px] leading-[1.45] text-preto/78 dark:text-branco/78">
                                <strong className="text-preto dark:text-branco">{item.Title}</strong>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
