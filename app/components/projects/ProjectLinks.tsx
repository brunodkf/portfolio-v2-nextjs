import { useTranslations } from 'next-intl';
import { HiArrowRight, HiArrowUpRight } from 'react-icons/hi2';

import type { Project } from '@/content/projects';
import { Link } from '@/i18n/routing';

const external = 'inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-fg/80 underline-offset-4 transition-colors hover:text-cobre hover:underline dark:hover:text-laranja';

export function ProjectLinks({ project, showCaseStudy = true }: { project: Project; showCaseStudy?: boolean }) {
  const t = useTranslations('Projects');
  const tHud = useTranslations('Hud');

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {showCaseStudy && project.caseStudy && (
        <Link
          href={`/projetos/${project.slug}`}
          className="inline-flex items-center gap-2 rounded bg-laranja px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-preto transition-colors hover:bg-laranja2"
        >
          {t('ReadCaseStudy')}
          <HiArrowRight aria-hidden="true" />
        </Link>
      )}
      {project.links.live && (
        <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={external}>
          {t('LiveSite')} <HiArrowUpRight aria-hidden="true" />
          <span className="sr-only">{tHud('newTab')}</span>
        </a>
      )}
      {project.links.repo && (
        <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={external}>
          {t('SourceCode')} <HiArrowUpRight aria-hidden="true" />
          <span className="sr-only">{tHud('newTab')}</span>
        </a>
      )}
    </div>
  );
}
