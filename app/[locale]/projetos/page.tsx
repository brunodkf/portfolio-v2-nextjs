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
    { name: 'Streaming APP', image: '/projects/streaming.webp', description: 'React APP', stacks: 'React | Tailwind CSS | JavaScript | APIs RESTful ', link: 'https://newlifefit.netlify.app/' },
    { name: 'LA Medic Rio', image: '/projects/lamedic.webp', description: 'Website Institucional', stacks: 'HTML | Sass | Javascript', link: 'https://lamedicrio.com/' },
    { name: 'Portfólio Web', image: '/projects/website.webp', description: 'Portfólio Online', stacks: 'HTML | CSS | Javascript', link: 'https://newlifefit.netlify.app/' },
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

            <ul className="h-auto mt-3 py-8 grid grid-cols-1 grid-rows-4 gap-6 lg:grid-rows-2 lg:grid-cols-2">
                {projectsCard.map((project, index) => (
                    <motion.li key={index} className="bg-preto w-11/12 m-auto rounded-lg p-2 shadow-lg">
                        <Image src={project.image} alt={project.name} width={400} height={400} className="rounded"/>
                        <div>
                            <h2 className={`${antonio.className} text-branco text-3xl`}>
                                {project.name}
                            </h2>
                            <small>{project.description}</small>
                            <p className="text-base">{project.stacks}</p>
                            <Link href="#">Confira</Link>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </main>
    )
}