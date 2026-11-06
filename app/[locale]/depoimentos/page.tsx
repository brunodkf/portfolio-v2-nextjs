import { getTranslations } from 'next-intl/server';

import { pageMetadata } from '@/lib/metadata';
import { resolveLocale, type LocaleParams } from '@/lib/params';
import { TestimonialsCarousel, type Testimonial } from '../../components/TestimonialsCarousel';
import { PageFrame, PageTitle } from '../../components/ui/Page';

export async function generateMetadata({ params }: LocaleParams) {
    return pageMetadata(await resolveLocale(params), 'feedback', '/depoimentos');
}

export default async function Depoimentos({ params }: LocaleParams) {
    const locale = await resolveLocale(params);
    const t = await getTranslations({ locale, namespace: 'Feedback' });

    return (
        <PageFrame className="container text-preto dark:text-branco">
            <div className="flex flex-col items-center lg:w-3/5">
                <PageTitle>{t('Title')}</PageTitle>
                <h2 className="text-center text-lg p-4">{t('SubTitle')}</h2>
                <p className="text-center px-4">{t('TextIntro')}</p>
            </div>

            <TestimonialsCarousel
                items={t.raw('Feedbacks') as Testimonial[]}
                labels={{
                    carousel: t('Carousel'),
                    previous: t('Previous'),
                    next: t('Next'),
                    slide: t('SlideLabel', { index: '{{index}}', total: '{{slidesLength}}' }),
                    goTo: t('GoTo', { index: '{{index}}' }),
                }}
            />
        </PageFrame>
    );
}
