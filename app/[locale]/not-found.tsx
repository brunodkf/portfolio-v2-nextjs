import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { PageFrame, PageTitle } from '../components/ui/Page';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <PageFrame className="container px-4 lg:px-0 text-center text-preto dark:text-branco">
      <p aria-hidden="true" className="font-title text-7xl text-cobre dark:text-laranja">404</p>
      <PageTitle className="mt-2">{t('Title')}</PageTitle>
      <p className="mt-2">{t('Text')}</p>
      <Link href="/" className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-cobre dark:text-laranja underline-offset-4 hover:underline">
        {t('Back')}
      </Link>
    </PageFrame>
  );
}
