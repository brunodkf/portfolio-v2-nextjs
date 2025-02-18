"use client";

import { useTranslations } from "next-intl";
import ListaDeHabilidades from "../components/ListaDeHabilidades";
import { Antonio } from 'next/font/google';
import Image from "next/image";

const antonio = Antonio({
    subsets: ['latin']
});


export default function Sobre() {

    const t = useTranslations('About')

    return (
        <main className="about container w-full h-svh flex items-center justify-center text-branco ">
            <div className="relative w-full h-2 flex flex-col items-center justify-center ">
                <h1 className={`${antonio.className} text-branco text-3xl`}>{t("Title")}</h1>

                <ul className="w-3/4 flex items-center justify-center my-8 gap-3">
                    <li className="w-1/2 bg-preto flex flex-col items-center justify-between py-8 px-2 text-center">
                        <Image src={'/icons/coding.webp'} width={45} height={45} alt="Icon Card"/>
                        <h2 className="font-medium my-3">{t("CardTitle1")}</h2>
                        <p className="font-thin">{t("CardDescription1")}</p>
                    </li>
                    <li className="w-1/2 bg-preto flex flex-col items-center justify-between py-8 px-2 text-center">
                        <Image src={'/icons/caneta.webp'} width={45} height={45} alt="Icon Card"/>
                        <h2 className="font-medium my-3">{t("CardTitle2")}</h2>
                        <p className="font-thin">{t("CardDescription2")}</p>
                    </li>
                    <li className="w-1/2 bg-preto flex flex-col items-center justify-between py-8 px-2 text-center">
                        <Image src={'/icons/search.webp'} width={45} height={45} alt="Icon Card"/>
                        <h2 className="font-medium my-3">{t("CardTitle3")}</h2>
                        <p className="font-thin">{t("CardDescription3")}</p>
                    </li>
                </ul>


                <p className="text-branco w-3/4 text-center mb-6">
                    {t("Description")}
                </p>

                <ListaDeHabilidades />
            </div>
        </main>
    )
}