import { useTranslations } from 'next-intl';

export function SkipLink() {
  const t = useTranslations('Hud');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-laranja focus:px-4 focus:py-2 focus:font-semibold focus:text-preto"
    >
      {t('skipToContent')}
    </a>
  );
}
