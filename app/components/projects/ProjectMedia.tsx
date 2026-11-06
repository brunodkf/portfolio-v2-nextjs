import type { Project, ProjectCopy } from '@/content/projects';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { BrowserFrame, PhoneFrame } from './Frames';

interface ProjectMediaProps {
  project: Project;
  copy: ProjectCopy;
  diagramLabel: string;
  variant?: 'compact' | 'full';
  priority?: boolean;
}

export function ProjectMedia({ project, copy, diagramLabel, variant = 'compact', priority }: ProjectMediaProps) {
  const { media } = project;

  if (media.diagram && copy.architecture) {
    return (
      <ArchitectureDiagram
        layers={copy.architecture.layers}
        variant={variant}
        label={diagramLabel}
        caption={variant === 'full' ? copy.architecture.note : undefined}
      />
    );
  }

  if (!media.desktop) return null;

  return (
    <div className={`relative ${media.mobile ? 'pb-10 pr-6 sm:pr-10' : ''}`}>
      <BrowserFrame
        src={media.desktop}
        alt={copy.alt.desktop ?? copy.title}
        domain={media.domain}
        priority={priority}
        sizes={variant === 'full' ? '(min-width: 1024px) 900px, 100vw' : '(min-width: 1024px) 600px, 100vw'}
      />
      {media.mobile && (
        <PhoneFrame
          src={media.mobile}
          alt={copy.alt.mobile ?? copy.title}
          priority={priority}
          sizes="(min-width: 1024px) 180px, 30vw"
          className="absolute bottom-0 right-0 w-[26%] min-w-[96px]"
        />
      )}
    </div>
  );
}
