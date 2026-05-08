"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import { useTranslations } from "next-intl";

import { RiDoubleQuotesR } from "react-icons/ri";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

interface FeedbackItem {
    Name: string;
    Position: string;
    Text: string;
}

export default function Depoimentos() {

    const t = useTranslations('Feedback');

    const feedbacksList: FeedbackItem[] = t.raw('Feedbacks')

    return (
        <main className="container w-full m-auto flex flex-col lg:items-center lg:justify-center text-preto dark:text-branco">
            <div className="flex flex-col items-center pt-32 lg:pt-0 lg:pb-3 lg:w-3/5">
                <h1 className={`font-title text-3xl`}>{t("Title")}</h1>
                <span className="w-10 h-[2px] my-2 bg-cinza dark:bg-laranja block rounded" />

                <h2 className="text-center text-lg p-4">{t("SubTitle")}</h2>

                <p className="text-center px-4">{t("TextIntro")}</p>
            </div>

            <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 4000,
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
                    <SwiperSlide key={index} className="w-64 mb-4 bg-preto p-6 flex flex-col justify-between text-white rounded-xl shadow-lg overflow-hidden">
                        <RiDoubleQuotesR className="absolute -z-10 text-9xl right-0 top-0 opacity-10" />

                        <div>
                            <h3 className="text-xl font-title text-laranja">
                                {feed.Name}
                            </h3>
                            <p className="font-title text-laranja text-sm">{feed.Position}</p>
                        </div>

                        <p className="pt-4 text-sm leading-relaxed">{feed.Text}</p>
                    </SwiperSlide>
                ))}
            </Swiper>

        </main>
    )
}
