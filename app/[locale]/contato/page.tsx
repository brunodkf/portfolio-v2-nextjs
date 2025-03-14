"use client";

import Link from 'next/link';
import { useTranslations } from "next-intl";

export default function Contato() {

    const t = useTranslations('Contact');

    return (
        <main className="contact container w-full h-svh flex flex-col lg:items-center lg:justify-center text-preto dark:text-branco">
            <div className="flex flex-col items-center pt-32 lg:pt-0 lg:pb-3">
                <h1 className={`font-title text-3xl`}>{t("Title")}</h1>
                <span className="w-10 h-[2px] my-2  bg-branco dark:bg-laranja block rounded"></span>
            </div>

            <div className="lg:w-3/4 flex flex-col justify-center text-center">
                <p className='py-20 text-xl lg:py-4'>{t("Text1")}</p>

                <Link href={"#"} aria-label={`Ir para Whatsapp`} className='bg-cinza dark:bg-laranja  p-4 rounded-xl w-4/5 lg:w-[40%] lg:text-sm m-auto text-branco dark:text-preto uppercase font-bold tracking-wider'>
                {t("Button")}
                </Link>

                <p className='py-20 text-xl lg:py-4'>{t("Text2")}</p>
            </div>
        </main>
    )
}