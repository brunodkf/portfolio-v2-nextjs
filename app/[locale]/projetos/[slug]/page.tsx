import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { caseStudies, getProject } from '@/content/projects';
import { Link, routing } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';
import { ProjectLinks } from '../../../components/projects/ProjectLinks';
import { ProjectMedia } from '../../../components/projects/ProjectMedia';
import { Reveal } from '../../../components/ui/Reveal';
import { TechList } from '../../../components/ui/TechList';

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => caseStudies.map(({ slug }) => ({ locale, slug })));
}

export const dynamicParams = false;

async function resolve(params: Params['params']) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();
  setRequestLocale(locale as Locale);
  return { locale: locale as Locale, project };
}

export async function generateMetadata({ params }: Params) {
  const { locale, project } = await resolve(params);
  const copy = project.copy[locale];
  return buildMetadata({
    locale,
    path: `/projetos/${project.slug}`,
    title: copy.title,
    description: copy.summary,
    type: 'article',
    image: project.media.desktop
      ? { url: project.media.desktop, width: 1440, height: 900, alt: copy.alt.desktop ?? copy.title }
      : undefined,
  });
}

function Section({ index, title, children }: { index: number; title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" trigger="view" className="grid gap-4 border-t border-fg/10 py-10 lg:grid-cols-12 lg:gap-12">
      <h2 className="flex items-baseline gap-3 lg:col-span-3">
        <span aria-hidden="true" className="font-mono text-xs text-cobre dark:text-laranja">{String(index).padStart(2, '0')}</span>
        <span className="font-title text-2xl text-fg">{title}</span>
      </h2>
      <div className="lg:col-span-9">{children}</div>
    </Reveal>
  );
}

export default async function CaseStudy({ params }: Params) {
  const { locale, project } = await resolve(params);
  const t = await getTranslations({ locale, namespace: 'Projects' });
  const copy = project.copy[locale];

  const position = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(position + 1) % caseStudies.length];

  let section = 0;
  const nextIndex = () => ++section;

  return (
    <article className="w-full px-4 pt-32 pb-20 sm:px-6 lg:px-16 lg:pt-28 xl:px-24">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/projetos"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-fg/70 transition-colors hover:text-cobre dark:hover:text-laranja"
        >
          <span aria-hidden="true">←</span> {t('AllProjects')}
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cobre dark:text-laranja">{copy.category}</p>
            <h1 className="mt-3 font-title text-6xl leading-none text-fg sm:text-7xl lg:text-8xl">{copy.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg/80">{copy.summary}</p>
          </div>

          <dl className="grid content-start gap-5 border-t border-fg/10 pt-6 text-sm lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg/60">{t('Sections.period')}</dt>
              <dd className="mt-1 text-fg">{copy.period}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg/60">{t('Sections.role')}</dt>
              <dd className="mt-1 text-fg">{copy.role}</dd>
            </div>
            {(project.links.live || project.links.repo) && (
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg/60">{t('Sections.links')}</dt>
                <dd className="mt-2">
                  <ProjectLinks project={project} showCaseStudy={false} />
                </dd>
              </div>
            )}
          </dl>
        </header>

        <div className="mt-12 lg:mt-16">
          <ProjectMedia project={project} copy={copy} diagramLabel={t('Sections.architecture')} variant="full" priority />
        </div>

        <div className="mt-12">
          {copy.context && (
            <Section index={nextIndex()} title={t('Sections.context')}>
              <p className="max-w-3xl leading-relaxed text-fg/85">{copy.context}</p>
            </Section>
          )}

          {copy.architecture && (
            <Section index={nextIndex()} title={t('Sections.architecture')}>
              <p className="max-w-3xl leading-relaxed text-fg/85">{copy.architecture.intro}</p>
              <p className="mt-4 font-title text-xl tracking-wide text-cobre dark:text-laranja">
                {copy.architecture.layers.map((l) => l.name).reverse().join(' → ')}
              </p>
            </Section>
          )}

          {copy.approach && (
            <Section index={nextIndex()} title={t('Sections.approach')}>
              <ol className="grid gap-6 md:grid-cols-2">
                {copy.approach.map((step, i) => (
                  <li key={step.title}>
                    <p aria-hidden="true" className="font-mono text-xs text-fg/50">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="mt-1 font-semibold text-fg">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg/80">{step.body}</p>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {copy.decisions && (
            <Section index={nextIndex()} title={t('Sections.decisions')}>
              <ul className="grid gap-4 md:grid-cols-2">
                {copy.decisions.map((d) => (
                  <li key={d.title} className="rounded-md bg-preto p-5 text-branco shadow-lg dark:bg-cinza">
                    <h3 className="font-title text-xl text-laranja">{d.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-branco/75">{d.problem}</p>
                    <p className="mt-3 text-sm leading-relaxed">
                      <span className="font-semibold text-laranja">{t('Sections.decision')}: </span>
                      {d.decision}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {copy.quality && (
            <Section index={nextIndex()} title={t('Sections.quality')}>
              <ul className="max-w-3xl space-y-2">
                {copy.quality.map((item) => (
                  <li key={item} className="flex items-start gap-2 leading-relaxed text-fg/85">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 leading-none text-cobre dark:text-laranja">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {copy.status && (
            <Section index={nextIndex()} title={t('Sections.status')}>
              <div className="grid gap-6 sm:grid-cols-2">
                {(['implemented', 'planned'] as const).map((group) => (
                  <div key={group}>
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg/60">{t(`Sections.${group}`)}</h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-fg/85">
                      {copy.status![group].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span aria-hidden="true" className={`size-1.5 rounded-full ${group === 'implemented' ? 'bg-cobre dark:bg-laranja' : 'border border-fg/40'}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {copy.outcome?.quote && (
            <Section index={nextIndex()} title={t('Sections.outcome')}>
              <figure className="max-w-3xl">
                <blockquote className="font-title text-3xl leading-tight text-fg lg:text-4xl">
                  <p>“{copy.outcome.quote.text}”</p>
                </blockquote>
                <figcaption className="mt-4 text-sm text-fg/70">
                  <span className="font-semibold text-fg">{copy.outcome.quote.author}</span>, {copy.outcome.quote.role}
                </figcaption>
              </figure>
            </Section>
          )}

          <Section index={nextIndex()} title={t('Sections.stack')}>
            <TechList items={project.stack} />
          </Section>
        </div>

        {next && next.slug !== project.slug && (
          <Link
            href={`/projetos/${next.slug}`}
            className="group mt-6 flex items-end justify-between gap-6 border-t border-fg/10 pt-10"
          >
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-fg/60">{t('NextProject')}</span>
              <span className="mt-2 block font-title text-5xl text-fg transition-colors group-hover:text-cobre dark:group-hover:text-laranja">
                {next.copy[locale].title}
              </span>
            </span>
            <span aria-hidden="true" className="font-title text-5xl text-cobre transition-transform group-hover:translate-x-2 dark:text-laranja">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}
