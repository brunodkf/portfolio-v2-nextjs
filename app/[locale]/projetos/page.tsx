"use client";

import { useTranslations } from "next-intl";
import { Antonio } from "next/font/google";

const antonio = Antonio({
    subsets: ['latin']
});


export default function Projetos() {

    const t = useTranslations('Projects')

    return (
        <main className="projects container w-full h-svh flex items-center justify-center text-branco bg-red-950">
            <div className="flex flex-col items-center">
                <h1 className={`${antonio.className} text-branco text-3xl`}>{t("Title")}</h1>
                <span className="w-10 h-[2px] mt-2 bg-laranja block rounded"></span>
            </div>
        </main>
    )
}