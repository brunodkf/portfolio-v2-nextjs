import { useTranslations } from 'next-intl';
import type { IconType } from 'react-icons';
import { FaGitAlt, FaReact } from 'react-icons/fa6';
import { IoLogoJavascript } from 'react-icons/io5';
import { RiTailwindCssFill } from 'react-icons/ri';
import { SiNextdotjs, SiSvelte, SiTypescript, SiVite } from 'react-icons/si';

const skills: { name: string; icon: IconType }[] = [
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: IoLogoJavascript },
  { name: 'React', icon: FaReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Svelte / SvelteKit', icon: SiSvelte },
  { name: 'Tailwind CSS', icon: RiTailwindCssFill },
  { name: 'Vite', icon: SiVite },
  { name: 'Git', icon: FaGitAlt },
];

export function SkillList({ className = '' }: { className?: string }) {
  const t = useTranslations('Hud');

  return (
    <ul aria-label={t('skills')} className={`flex flex-wrap justify-center gap-4 text-cinza dark:text-branco ${className}`}>
      {skills.map(({ name, icon: Icon }) => (
        <li key={name} className="group relative cursor-default text-2xl" title={name}>
          <Icon aria-hidden="true" />
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-cinza px-2 py-1 text-xs text-branco opacity-0 transition-opacity group-hover:opacity-100">
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
}
