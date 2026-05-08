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
        <main className="experience container w-full h-svh flex flex-col lg:items-center lg:justify-center text-preto dark:text-branco">
            <div className="flex flex-col items-center pt-32 lg:pt-0 lg:pb-3">
                <h1 className={`font-title text-3xl`}>{t("Title")}</h1>
                <span className="w-10 h-[2px] my-2 bg-cinza dark:bg-laranja block rounded" />
            </div>

            <div className="w-full lg:w-3/4 pb-32 lg:pb-0 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto custom-scrollbar lg:dark:bg-cinza lg:rounded-md">
                <ul>
                    {experiences.map((exp, index) => (
                        <li key={index} className="mt-4 p-4">
                            <h3 className="font-title text-preto dark:text-laranja text-2xl">{exp.Title}</h3>
                            <p className="font-semibold text-sm text-preto/80 dark:text-branco/90 mt-1">{exp.Position}</p>
                            <p className="text-xs text-preto/50 dark:text-branco/50 mt-0.5 font-mono tracking-wide">{exp.Date}</p>
                            <p className="mt-3 text-sm leading-relaxed">{exp.Description}</p>

                            <p className="mt-3 font-bold text-preto dark:text-laranja text-sm">{t("Job")}:</p>
                            <ul className="mt-1 space-y-1.5">
                                {exp.Responsibilities.map((resp, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <span className="text-laranja mt-0.5 shrink-0 leading-none">▸</span>
                                        <span>{resp}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}
