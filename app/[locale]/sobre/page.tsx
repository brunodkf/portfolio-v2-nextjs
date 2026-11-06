import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { pageMetadata } from '@/lib/metadata';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { SkillList } from '../../components/SkillList';
import { PageFrame, PageTitle } from '../../components/ui/Page';
import { Reveal } from '../../components/ui/Reveal';

const cardIcons = ['/icons/coding.webp', '/icons/caneta.webp', '/icons/search.webp'];

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata(await resolveLocale(params), 'about', '/sobre');
}

export default async function Sobre({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'About' });
  const cards = t.raw('Cards') as { title: string; description: string }[];
  const paragraphs = t.raw('Paragraphs') as string[];

  return (
    <PageFrame className="container px-4 lg:px-0">
      <PageTitle>{t('Title')}</PageTitle>

      <ul className="w-full lg:w-3/4 flex flex-col lg:flex-row items-stretch justify-center my-8 gap-3">
        {cards.map((card, index) => (
          <Reveal
            as="li"
            key={card.title}
            duration={0.5 + index * 0.2}
            className="lg:w-1/3 bg-preto dark:bg-cinza text-branco shadow-lg rounded-md flex flex-col items-center py-8 px-4 text-center hover:shadow-2xl hover:-translate-y-1 transition-[box-shadow,transform] duration-300"
          >
            <Image src={cardIcons[index]} width={45} height={45} alt="" />
            <h2 className="font-medium my-3">{card.title}</h2>
            <p className="text-sm leading-relaxed text-branco/80">{card.description}</p>
          </Reveal>
        ))}
      </ul>

      <div className="w-full lg:w-3/4 max-w-3xl space-y-4 text-preto dark:text-branco leading-relaxed mb-8">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <SkillList />
    </PageFrame>
  );
}
