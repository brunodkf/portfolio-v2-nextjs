"use client";

import { useTranslations } from "next-intl";
import { Antonio } from "next/font/google";
import { motion } from 'framer-motion';
import Link from "next/link";
import Image from "next/image";

const antonio = Antonio({
    subsets: ['latin']
});


interface Project {
    name: string;
    image: string;
    description: string;
    stacks: string;
    link: string;
}


export default function Projetos() {

    const t = useTranslations('Projects');

    const projectsCard: Project[] = [
        { name: 'Streaming APP', image: '/projects/streaminglg.webp', description: 'React App', stacks: 'React | Tailwind CSS | JavaScript', link: 'https://streaming-opal.vercel.app/' },
        { name: 'LA Medic Rio', image: '/projects/lamediclg.webp', description: 'Website Institucional', stacks: 'HTML | Sass | Javascript', link: 'https://lamedicrio.com/' },
        { name: 'Portfólio Web - V1', image: '/projects/websitelg.webp', description: 'Portfólio Online', stacks: 'HTML | CSS | Javascript', link: 'http://brunodkf.netlify.app/' },
        { name: 'NewLife Fitness', image: '/projects/newlifelg.webp', description: 'Website Institucional', stacks: 'HTML | Sass | Javascript', link: 'https://newlifefit.netlify.app/' },
    ]
    

    return (
        <main className="projects container w-full h-svh flex flex-col lg:items-center lg:justify-center text-branco">
            
            <div className="py-32 lg:py-0 ">

                <div className="flex flex-col items-center">
                    <h1 className={`${antonio.className} text-branco text-3xl`}>{t("Title")}</h1>
                    <span className="w-10 h-[2px] mt-2 bg-laranja block rounded"></span>
                </div>

                <ul className="w-3/3  h-auto mt-3 py-8 grid grid-cols-1 grid-rows-4 
                lg:w-full lg:mt-8 lg:py-0 lg:gap-3 lg:grid-rows-2 lg:grid-cols-2 ">
                    {projectsCard.map((project, index) => (
                        <motion.li key={index} 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.4 }}
                        className="bg-preto w-[80%] m-auto rounded-lg p-2 shadow-xl 
                        lg:w-full lg:h-full lg:flex lg:items-center lg:justify-between">

                            <Image src={project.image} alt={project.name} width={200} height={200} className="rounded m-auto 
                            lg:w-1/5 lg:max-h-24 " />

                            <div className="p-2 flex flex-col items-center justify-between 
                            lg:w-3/5 lg:items-start lg:flex-col">
                                <div className="w-full h-auto">
                                    <h2 className={`${antonio.className} text-branco text-3xl 
                                    lg:text-2xl mt-2`}>
                                        {project.name}
                                    </h2>
                                    <small className="">{project.description}</small>
                                    <p className="text-sm">{project.stacks}</p>
                                </div>
                                <Link href={project.link} className="w-full text-center p-2 px-4 mt-3 bg-laranja text-preto rounded font-bold uppercase tracking-wider 
                                lg:w-2/3 lg:p-0 lg:mt-2 text-sm">{t("Button")}</Link>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>

        </main>
    )
}