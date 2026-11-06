"use client"

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay, EffectCoverflow, Keyboard, Navigation, Pagination } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { RiDoubleQuotesR } from "react-icons/ri";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export interface Testimonial {
    Name: string;
    Position: string;
    Text: string;
}

interface Labels {
    carousel: string;
    previous: string;
    next: string;
    slide: string; 
    goTo: string;
}

const AUTOPLAY_DELAY = 6000;
const controlClass = "flex size-9 items-center justify-center rounded-full border border-cinza/40 dark:border-branco/30 text-preto dark:text-branco transition-colors hover:bg-laranja hover:text-preto hover:border-laranja disabled:opacity-40";

export function TestimonialsCarousel({ items, labels }: { items: Testimonial[]; labels: Labels }) {
    const reduceMotion = useReducedMotion();
    const swiperRef = useRef<SwiperInstance | null>(null);
    const playing = !reduceMotion;

    useEffect(() => {
        const autoplay = swiperRef.current?.autoplay;
        if (!autoplay) return;
        if (playing) autoplay.start();
        else autoplay.stop();
    }, [playing]);

    return (
        <section
            aria-label={labels.carousel}
            aria-roledescription="carousel"
            className="w-11/12 max-w-3xl mt-4"
            onFocus={() => swiperRef.current?.autoplay?.pause()}
            onBlur={(event) => {
                if (playing && !event.currentTarget.contains(event.relatedTarget)) swiperRef.current?.autoplay?.resume();
            }}
        >
            <Swiper
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView="auto"
                rewind
                speed={reduceMotion ? 0 : 400}
                keyboard={{ enabled: true, onlyInViewport: true }}
                navigation={{ prevEl: '.testimonials-prev', nextEl: '.testimonials-next' }}
                pagination={{ clickable: true, el: '.testimonials-pagination' }}
                autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false, pauseOnMouseEnter: true }}
                a11y={{
                    prevSlideMessage: labels.previous,
                    nextSlideMessage: labels.next,
                    slideLabelMessage: labels.slide,
                    paginationBulletMessage: labels.goTo,
                }}
                coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
                modules={[A11y, Autoplay, EffectCoverflow, Keyboard, Navigation, Pagination]}
            >
                {items.map((feed) => (
                    <SwiperSlide key={feed.Name} className="!w-[85%] sm:!w-[75%] mb-4 bg-preto p-6 text-white rounded-xl shadow-lg overflow-hidden">
                        <figure className="relative flex h-full flex-col">
                            <RiDoubleQuotesR aria-hidden="true" className="absolute -z-10 text-9xl -right-2 -top-2 opacity-10" />
                            <figcaption>
                                <span className="block text-xl font-title text-laranja">{feed.Name}</span>
                                <span className="block font-title text-laranja text-sm">{feed.Position}</span>
                            </figcaption>
                            <blockquote className="pt-4 text-sm leading-relaxed">
                                <p>{feed.Text}</p>
                            </blockquote>
                        </figure>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="mt-2 flex items-center justify-center gap-4">
                <button type="button" className={`testimonials-prev ${controlClass}`} aria-label={labels.previous}>
                    <HiChevronLeft aria-hidden="true" />
                </button>
                <div className="testimonials-pagination !static !w-auto flex items-center gap-1" />
                <button type="button" className={`testimonials-next ${controlClass}`} aria-label={labels.next}>
                    <HiChevronRight aria-hidden="true" />
                </button>
            </div>
        </section>
    );
}
