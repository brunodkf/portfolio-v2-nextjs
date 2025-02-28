"use client";

import { useTranslations } from "next-intl";
import { Antonio } from "next/font/google";
import { motion } from 'framer-motion';
import Link from "next/link";
import Image from "next/image";

const antonio = Antonio({
    subsets: ['latin']
});

const projectsCard = [
    { name: 'Streaming APP', image: '/projects/streaming.webp', description: 'React APP', stacks: 'React | Tailwind | JavaScript ', link: 'https://streaming-opal.vercel.app/' },
    { name: 'LA Medic Rio', image: '/projects/lamedic.webp', description: 'Website Institucional', stacks: 'HTML | Sass | Javascript', link: 'https://lamedicrio.com/' },
    { name: 'Portfólio Web - V1', image: '/projects/website.webp', description: 'Portfólio Online', stacks: 'HTML | CSS | Javascript', link: 'http://brunodkf.netlify.app/' },
    { name: 'NewLife Fitness', image: '/projects/newlife.webp', description: 'Website Institucional', stacks: 'HTML | Sass | Javascript', link: 'https://newlifefit.netlify.app/' },
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

            <ul className="w-3/3  h-auto mt-3 py-8 grid grid-cols-1 grid-rows-4 gap-6 lg:w-4/5 lg:py-0 lg:gap-3 lg:grid-rows-2 lg:grid-cols-2 ">
                {projectsCard.map((project, index) => (
                    <motion.li key={index} className="bg-preto w-full m-auto rounded-lg p-2 shadow-xl lg:w-full lg:h-full lg:flex lg:items-center">

                        <Image src={project.image} alt={project.name} width={400} height={400} className="rounded lg:w-2/5 lg:max-h-24" />

                        <div className="p-2 flex items-center justify-between lg:flex-col">
                            <div className="w-4/4 h-auto">
                                <h2 className={`${antonio.className} text-branco text-3xl lg:text-2xl`}>
                                    {project.name}
                                </h2>
                                <small className="">{project.description}</small>
                                <p className="text-sm">{project.stacks}</p>
                            </div>
                            <Link href={project.link} className="w-1/4 text-center p-2 px-4  bg-laranja text-preto rounded font-medium lg:w-2/3 lg:p-0 lg:mt-2">Confira</Link>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </main>
    )
}