import type { Locale } from 'next-intl';
import { useTranslations } from 'next-intl';

import type { Project } from '@/content/projects';
import { Reveal } from '../ui/Reveal';
import { TechList } from '../ui/TechList';
import { BrowserFrame } from './Frames';
import { ProjectLinks } from './ProjectLinks';

export function SelectedProject({ project, locale }: { project: Project; locale: Locale }) {
  const t = useTranslations('Projects');
  const copy = project.copy[locale];

  return (
    <Reveal as="article" trigger="view" className="grid gap-5 border-t border-fg/10 py-8 sm:grid-cols-12 sm:gap-8">
      {project.media.desktop && (
        <div className="sm:col-span-5 lg:col-span-4">
          <BrowserFrame
            src={project.media.desktop}
            alt={copy.alt.desktop ?? copy.title}
            domain={project.media.domain}
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 40vw, 100vw"
          />
        </div>
      )}

      <div className="sm:col-span-7 lg:col-span-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg/60">
          {copy.category} <span className="font-mono font-normal normal-case tracking-normal">· {copy.period}</span>
        </p>
        <h3 className="mt-2 font-title text-3xl text-fg">{copy.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg/80">{copy.summary}</p>

        <ul className="mt-3 space-y-1.5">
          {copy.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-fg/80">
              <span aria-hidden="true" className="mt-0.5 shrink-0 leading-none text-cobre dark:text-laranja">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <TechList items={project.stack} label={t('Sections.stack')} className="mt-4" />

        <div className="mt-5">
          <ProjectLinks project={project} showCaseStudy={false} />
        </div>
      </div>
    </Reveal>
  );
}
