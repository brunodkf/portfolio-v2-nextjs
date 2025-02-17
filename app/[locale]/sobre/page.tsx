"use client";

import { useTranslations } from "next-intl";
import ListaDeHabilidades from "../components/ListaDeHabilidades";
import { Antonio } from 'next/font/google';

const antonio = Antonio({
    subsets: ['latin']
});

const hardSkills = [
    {image: 'React'},
]

export default function Sobre() {

    const t = useTranslations('About')

    return (
        <main className="about container w-full h-svh flex items-center justify-center ">
            <div className="relative w-full h-2 flex flex-col items-center justify-center ">
                <h1 className={`${antonio.className} text-branco text-3xl`}>{t("Title")}</h1>



                <p className="text-branco w-3/4 text-center mb-6">
                    {t("Description")}
                </p>

                <ListaDeHabilidades />
            </div>
        </main>
    )
}