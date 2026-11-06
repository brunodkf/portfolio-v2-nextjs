import { getTranslations } from 'next-intl/server';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineDocumentArrowDown } from 'react-icons/hi2';
import { TiMessages } from 'react-icons/ti';

import { resumePath, siteConfig } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { PageFrame, PageTitle } from '../../components/ui/Page';

export async function generateMetadata({ params }: LocaleParams) {
    return pageMetadata(await resolveLocale(params), 'contact', '/contato');
}

const secondary = 'flex items-center justify-center gap-2 rounded-xl border border-cinza/40 dark:border-laranja/60 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-cinza hover:text-branco dark:hover:bg-laranja dark:hover:text-preto';

export default async function Contato({ params }: LocaleParams) {
    const locale = await resolveLocale(params);
    const t = await getTranslations({ locale, namespace: 'Contact' });

    return (
        <PageFrame className="container px-4 lg:px-0 text-preto dark:text-branco">
            <PageTitle>{t('Title')}</PageTitle>

            <div className="w-full lg:w-3/4 max-w-2xl flex flex-col items-center text-center">
                <p className="pt-6 text-xl leading-relaxed">{t('Lead')}</p>
                <p className="pt-3 pb-8 text-sm leading-relaxed text-preto/75 dark:text-branco/75">{t('Text')}</p>

                <a
                    href={`mailto:${siteConfig.email}`}
                    className="w-full sm:w-4/5 lg:w-3/5 bg-cinza dark:bg-laranja p-3 rounded-xl text-branco dark:text-preto uppercase font-bold tracking-wider flex flex-col items-center justify-center hover:brightness-110 transition-[filter]"
                >
                    <span className="flex items-center gap-2 text-sm">
                        <TiMessages aria-hidden="true" className="text-2xl" />
                        {t('Email')}
                    </span>
                    <span className="mt-0.5 text-xs font-medium normal-case tracking-normal opacity-80">{siteConfig.email}</span>
                </a>

                <div className="mt-3 grid w-full sm:w-4/5 lg:w-3/5 grid-cols-2 gap-3">
                    <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t('LinkedInAria')} className={secondary}>
                        <FaLinkedinIn aria-hidden="true" className="text-lg" />
                        {t('LinkedIn')}
                    </a>
                    <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={t('WhatsappAria')} className={secondary}>
                        <FaWhatsapp aria-hidden="true" className="text-lg" />
                        {t('WhatsApp')}
                    </a>
                </div>

                <a
                    href={resumePath[locale]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cobre dark:text-laranja underline-offset-4 hover:underline"
                >
                    <HiOutlineDocumentArrowDown aria-hidden="true" className="text-lg" />
                    {t('Resume')}
                </a>
            </div>
        </PageFrame>
    );
}
