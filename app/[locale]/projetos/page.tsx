import { getTranslations } from 'next-intl/server';

import { featuredProjects, selectedProjects } from '@/content/projects';
import { pageMetadata } from '@/lib/metadata';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { FeaturedProject } from '../../components/projects/FeaturedProject';
import { SelectedProject } from '../../components/projects/SelectedProject';

export async function generateMetadata({ params }: LocaleParams) {
    return pageMetadata(await resolveLocale(params), 'projects', '/projetos');
}

export default async function Projetos({ params }: LocaleParams) {
    const locale = await resolveLocale(params);
    const t = await getTranslations({ locale, namespace: 'Projects' });

    return (
        <div className="w-full px-4 pt-32 pb-20 sm:px-6 lg:px-16 lg:pt-28 xl:px-24">
            <div className="mx-auto max-w-6xl">
                <header className="max-w-3xl">
                    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-cobre dark:text-laranja">
                        <span aria-hidden="true" className="h-[2px] w-10 rounded bg-cinza dark:bg-laranja" />
                        {t('Eyebrow')}
                    </p>
                    <h1 className="mt-4 font-title text-6xl leading-none text-fg sm:text-7xl lg:text-8xl">{t('Title')}</h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg/80">{t('Intro')}</p>
                </header>

                <section aria-labelledby="featured-heading" className="mt-16">
                    <h2 id="featured-heading" className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-fg/60">
                        {t('Featured')}
                    </h2>
                    {featuredProjects.map((project, index) => (
                        <FeaturedProject key={project.slug} project={project} locale={locale} index={index} />
                    ))}
                </section>

                <section aria-labelledby="selected-heading" className="mt-12">
                    <h2 id="selected-heading" className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-fg/60">
                        {t('Selected')}
                    </h2>
                    {selectedProjects.map((project) => (
                        <SelectedProject key={project.slug} project={project} locale={locale} />
                    ))}
                </section>
            </div>
        </div>
    );
}
