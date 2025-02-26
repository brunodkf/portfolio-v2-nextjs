"use client";

import { useTranslations } from "next-intl";
import ListaDeHabilidades from "../components/ListaDeHabilidades";
import { Antonio } from 'next/font/google';
import Image from "next/image";
import { motion } from "framer-motion";

const antonio = Antonio({
    subsets: ['latin']
});


export default function Sobre() {

    const t = useTranslations('About')

    return (
        <main className="about container w-full h-svh flex lg:items-center justify-center text-branco">
            
            <div className="relative w-full h-fit flex flex-col items-center py-32 lg:py-0 ">

                <div className="flex flex-col items-center">
                    <h1 className={`${antonio.className} text-branco text-3xl`}>{t("Title")}</h1>
                    <span className="w-10 h-[2px] mt-2 bg-laranja block rounded"></span>
                </div>

                <ul className="w-3/4 flex flex-col lg:flex-row items-stretch justify-center my-8 gap-3">

                    <motion.li className="lg:w-1/2 bg-cinza shadow-lg rounded-md  flex flex-col items-center justify-between py-8 px-2 text-center"
                        initial={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: .5 }}>
                        <Image src={'/icons/coding.webp'} width={45} height={45} alt="Icon Card" />
                        <h2 className="font-medium my-3">{t("CardTitle1")}</h2>
                        <p className="font-thin">{t("CardDescription1")}</p>
                    </motion.li>

                    <motion.li className="lg:w-1/2 bg-cinza shadow-lg rounded-md  flex flex-col items-center justify-between py-8 px-2 text-center"
                        initial={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: .8 }}>
                        <Image src={'/icons/caneta.webp'} width={45} height={45} alt="Icon Card" />
                        <h2 className="font-medium my-3">{t("CardTitle2")}</h2>
                        <p className="font-thin">{t("CardDescription2")}</p>
                    </motion.li>

                    <motion.li className="lg:w-1/2 bg-cinza shadow-lg rounded-md  flex flex-col items-center justify-between py-8 px-2 text-center"
                        initial={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 1 }}>
                        <Image src={'/icons/search.webp'} width={45} height={45} alt="Icon Card" />
                        <h2 className="font-medium my-3">{t("CardTitle3")}</h2>
                        <p className="font-thin">{t("CardDescription3")}</p>
                    </motion.li>

                </ul>


                <p className="text-branco lg:w-3/4 text-center mb-6 p-4 lg:p-0">
                    {t("Description")}
                </p>

                <ListaDeHabilidades view='block' />


            </div>
        </main>
    )
}