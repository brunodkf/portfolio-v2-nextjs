"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import 'swiper/css/pagination';
import { useTranslations } from "next-intl";

import { RiDoubleQuotesR } from "react-icons/ri";

interface FeedbackItem {
    Name: string;
    Position: string;
    Text: string;
}

export default function Depoimentos() {

    const t = useTranslations('Feedback');

    const feedbacksList: FeedbackItem[] = t.raw('Feedbacks')

    console.log(feedbacksList)

    return (
        <main className="container w-full m-auto flex flex-col lg:items-center lg:justify-center text-preto dark:text-branco">
            <div className="flex flex-col items-center pt-32 lg:pt-0 lg:pb-3 lg:w-3/5">
                <h1 className={`font-title text-3xl`}>{t("Title")}</h1>
                <span className="w-10 h-[2px] my-2  bg-branco dark:bg-laranja block rounded"></span>


                <h2 className="text-center text-lg p-4">Veja o que meus clientes e parceiros dizem sobre meu trabalho!</h2>

                <p className="text-center px-4">Cada projeto é único, e meu compromisso é entregar soluções eficientes, otimizadas e bem estruturadas. Veja o que dizem sobre a experiência de trabalhar comigo.</p>

            </div>


            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
                className="w-11/12 max-w-3xl mt-4"
            >
                {feedbacksList.map((feed, index) => (
                    <SwiperSlide key={index} className="w-60 h-60 mb-4 bg-preto p-4 flex flex-col items-center justify-center text-white rounded-xl shadow-lg">
                        <RiDoubleQuotesR className="absolute -z-10 text-9xl right-0 opacity-10" />

                        <div className="">
                            <h3 className="text-2xl font-title text-laranja">
                                {feed.Name}
                            </h3>
                            <p className="font-title text-laranja">{feed.Position}</p>
                        </div>

                        <p className="pt-4">{feed.Text}</p>
                    </SwiperSlide>
                ))}
            </Swiper>

        </main>
    )
}