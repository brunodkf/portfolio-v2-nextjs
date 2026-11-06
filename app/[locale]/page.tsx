import { getTranslations } from 'next-intl/server';

import { siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import HomeAnimation from '../components/HomeAnimation';

export async function generateMetadata({ params }: LocaleParams) {
  return pageMetadata(await resolveLocale(params), 'home', '/');
}

export default async function Home({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: t('role'),
    url: siteConfig.url,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
  };

  return (
    <div className="home w-full h-svh lg:h-full flex items-center justify-center overflow-hidden lg:overflow-visible">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <div className="relative w-full flex items-center justify-center">
        <HomeAnimation />

        <div className="font-title absolute inset-0 text-cinza dark:text-branco flex flex-col items-center justify-center">
          <h1 className="text-center text-[80px] md:text-[102px] leading-[80px] md:leading-[100px]">
            BRUNO <br /> FURTADO
          </h1>
          <p className="mt-4 font-sans text-sm font-extralight uppercase tracking-[5px] text-laranja">{t('role')}</p>
        </div>
      </div>
    </div>
  );
}
