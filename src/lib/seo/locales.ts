import { localizeHref } from '$lib/paraglide/runtime';

export const SITE_URL = 'https://ekibaz.com';

export const indexedSeoLocales = [
	{ locale: 'ru', hreflang: 'ru-KZ', ogLocale: 'ru_KZ' },
	{ locale: 'en', hreflang: 'en-KZ', ogLocale: 'en_KZ' }
] as const;

export type IndexedSeoLocale = (typeof indexedSeoLocales)[number]['locale'];
export type SiteLocale = IndexedSeoLocale | 'kk';

export const isIndexedSeoLocale = (locale: string): locale is IndexedSeoLocale =>
	indexedSeoLocales.some((item) => item.locale === locale);

export const getLocalizedPath = (path: string, locale: SiteLocale) =>
	localizeHref(path, { locale });

export const getAbsoluteLocalizedUrl = (path: string, locale: SiteLocale) =>
	`${SITE_URL}${getLocalizedPath(path, locale)}`;

export const getSeoLocaleMetadata = (path: string, locale: SiteLocale) => {
	const indexable = isIndexedSeoLocale(locale);
	const canonicalLocale: IndexedSeoLocale = indexable ? locale : 'ru';
	const currentLocale = indexedSeoLocales.find((item) => item.locale === locale);

	return {
		indexable,
		canonicalLocale,
		canonical: getAbsoluteLocalizedUrl(path, canonicalLocale),
		ogLocale: currentLocale?.ogLocale ?? 'kk_KZ',
		ogAlternates: indexedSeoLocales
			.filter((item) => item.locale !== locale)
			.map((item) => item.ogLocale),
		alternates: indexedSeoLocales.map((item) => ({
			...item,
			href: getAbsoluteLocalizedUrl(path, item.locale)
		})),
		xDefault: getAbsoluteLocalizedUrl(path, 'ru')
	};
};
