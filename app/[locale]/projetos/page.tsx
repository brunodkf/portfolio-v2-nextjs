"use client";

import { useTranslations } from "next-intl";
import { Antonio } from "next/font/google";
import { motion } from 'framer-motion';
import Link from "next/link";
import Image from "next/image";

const antonio = Antonio({
    subsets: ['latin']
});

const ProjectsCard = [
    {name: 'LA Medic Rio', image: '/projects/lamedic.webp', }
]


export default function Projetos() {

    const t = useTranslations('Projects')

    return (
        <main className="projects container w-full h-svh flex flex-col lg:items-center lg:justify-center text-branco">
            <div className="my-16 lg:my-0"></div>
            <div className="flex flex-col items-center">
                <h1 className={`${antonio.className} text-branco text-3xl`}>{t("Title")}</h1>
                <span className="w-10 h-[2px] mt-2 bg-laranja block rounded"></span>
            </div>

            <ul className="w-full h-auto bg-blue-900">
                <motion.li>
                    <Image src={''} alt="Hexágono" className="md:w-[50%]" />
                    <div className="">
                        <h2 className={`${antonio.className} text-branco text-3xl`}>
                            LA Medic Rio
                        </h2>
                        <small className="">Website Institucional</small>

                        <p className="text-base">HTML | SASS | Javascript</p>

                        <Link href={'#'}>Confira</Link>
                    </div>
                </motion.li>
            </ul>
        </main>
    )
}