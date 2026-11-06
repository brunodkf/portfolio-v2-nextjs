import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { resolveLocale, type LocaleParams } from '@/lib/params';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Metadata.pages.notFound' });
  return { title: t('title'), description: t('description'), robots: { index: false } };
}

export default function CatchAll() {
  notFound();
}
