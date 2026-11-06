import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export type LocaleParams = { params: Promise<{ locale: string }> };

export async function resolveLocale(params: LocaleParams['params']): Promise<Locale> {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return locale as Locale;
}
