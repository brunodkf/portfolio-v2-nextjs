"use client";

import { useTranslations } from "next-intl";

interface ExperienceItem {
    Title: string;
    Position: string;
    Date: string;
    Description: string;
    Responsibilities: string[];
}

export default function Experiencia() {

    const t = useTranslations('Experience');

    const experiences: ExperienceItem[] = t.raw('Experiences');

    return (
        <main className="experience container w-full h-svh flex flex-col lg:items-center lg:justify-center text-branco">
            <div className="flex flex-col items-center pt-32 lg:pt-0 lg:pb-3">
                <h1 className={`font-title text-branco text-3xl`}>{t("Title")}</h1>
                <span className="w-10 h-[2px] my-2 bg-laranja block rounded"></span>
            </div>

            <div className=" w-full lg:w-3/4 h-2/4 pb-32 lg:pb-0 lg:overflow-y-auto custom-scrollbar lg:bg-cinza ">
                <ul className="pb-32 lg:pb-0">
                    {experiences.map((exp, index) => (
                        <li key={index} className="mt-4 p-4">
                            <h3 className="font-title text-laranja text-2xl">{exp.Title}</h3>
                            <p className="font-title text-laranja mt-1"><strong>{exp.Position}</strong></p>
                            <p className="font-title mt-1">{exp.Date}</p>
                            <p className="mt-3">{exp.Description}</p>

                            <p className="mt-3 font-bold text-laranja">{t("Job")} :</p>
                            <ul >
                                {exp.Responsibilities.map((resp, i) => (
                                    <li key={i} className="mt-2">▫️ {resp}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}