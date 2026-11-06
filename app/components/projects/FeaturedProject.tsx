import type { Locale } from 'next-intl';
import { useTranslations } from 'next-intl';

import type { Project } from '@/content/projects';
import { Reveal } from '../ui/Reveal';
import { TechList } from '../ui/TechList';
import { HexIndex } from './HexIndex';
import { ProjectLinks } from './ProjectLinks';
import { ProjectMedia } from './ProjectMedia';

interface FeaturedProjectProps {
  project: Project;
  locale: Locale;
  index: number;
}

export function FeaturedProject({ project, locale, index }: FeaturedProjectProps) {
  const t = useTranslations('Projects');
  const copy = project.copy[locale];
  const reversed = index % 2 === 1;

  return (
    <Reveal as="article" trigger="view" className="grid items-start gap-8 border-t border-fg/10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
      <div className={`lg:col-span-7 lg:pt-2 ${reversed ? 'lg:order-2' : ''}`}>
        <ProjectMedia project={project} copy={copy} diagramLabel={t('Sections.architecture')} priority={index === 0} />
      </div>

      <div className="lg:col-span-5">
        <div className="flex items-center gap-4">
          <HexIndex value={index + 1} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fg/60">
            {copy.category}
            <span className="block font-mono font-normal normal-case tracking-normal">{copy.period}</span>
          </p>
        </div>

        <h3 className="mt-5 font-title text-5xl leading-none text-fg lg:text-6xl">{copy.title}</h3>
        <p className="mt-4 leading-relaxed text-fg/80">{copy.summary}</p>

        <ul className="mt-5 space-y-2">
          {copy.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-fg/90">
              <span aria-hidden="true" className="mt-0.5 shrink-0 leading-none text-cobre dark:text-laranja">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <TechList items={project.stack} label={t('Sections.stack')} className="mt-6" />

        <div className="mt-8">
          <ProjectLinks project={project} />
        </div>
      </div>
    </Reveal>
  );
}
