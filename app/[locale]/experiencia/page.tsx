import { getTranslations } from 'next-intl/server';

import { pageMetadata } from '@/lib/metadata';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { PageFrame, PageTitle } from '../../components/ui/Page';
import { TechList } from '../../components/ui/TechList';

interface ExperienceItem {
    Company: string;
    Role: string;
    Period: string;
    Location: string;
    Summary: string;
    Highlights: string[];
    Stack: string[];
}

export async function generateMetadata({ params }: LocaleParams) {
    return pageMetadata(await resolveLocale(params), 'experience', '/experiencia');
}

export default async function Experiencia({ params }: LocaleParams) {
    const locale = await resolveLocale(params);
    const t = await getTranslations({ locale, namespace: 'Experience' });
    const experiences = t.raw('Experiences') as ExperienceItem[];

    return (
        <PageFrame className="container text-preto dark:text-branco">
            <PageTitle>{t('Title')}</PageTitle>

            <ol className="w-full lg:w-3/4 mt-4 lg:dark:bg-cinza lg:rounded-md">
                {experiences.map((exp) => (
                    <li key={exp.Company} className="p-4 lg:p-6 border-b last:border-b-0 border-preto/10 dark:border-branco/10">
                        <article>
                            <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                <div>
                                    <h2 className="font-title text-preto dark:text-laranja text-2xl">{exp.Company}</h2>
                                    <p className="font-semibold text-sm text-preto/80 dark:text-branco/90 mt-1">{exp.Role}</p>
                                </div>
                                <p className="text-xs text-preto/60 dark:text-branco/60 font-mono tracking-wide sm:text-right">
                                    {exp.Period}
                                    <span className="block">{exp.Location}</span>
                                </p>
                            </header>

                            <p className="mt-3 text-sm leading-relaxed">{exp.Summary}</p>

                            <h3 className="mt-4 font-bold text-cobre dark:text-laranja text-sm">{t('Highlights')}</h3>
                            <ul className="mt-2 space-y-1.5">
                                {exp.Highlights.map((item) => (
                                    <li key={item.slice(0, 32)} className="flex items-start gap-2 text-sm leading-relaxed">
                                        <span aria-hidden="true" className="text-cobre dark:text-laranja mt-0.5 shrink-0 leading-none">▸</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <TechList items={exp.Stack} label={t('Stack')} className="mt-4" />
                        </article>
                    </li>
                ))}
            </ol>
        </PageFrame>
    );
}
