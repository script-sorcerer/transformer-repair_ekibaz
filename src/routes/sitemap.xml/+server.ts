import type { RequestHandler } from './$types';
import { getAbsoluteLocalizedUrl, indexedSeoLocales } from '$lib/seo/locales';
import { getPageHref, seoPages } from '$lib/seo/content';

export const GET = (async () => {
	const paths = [
		'/',
		'/repair',
		'/services',
		'/regions',
		'/articles',
		...seoPages.map(getPageHref)
	];

	const urls = paths
		.flatMap((path) =>
			indexedSeoLocales.map(({ locale }) => {
				const alternateLinks = indexedSeoLocales
					.map(
						(alternate) =>
							`<xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${getAbsoluteLocalizedUrl(path, alternate.locale)}" />`
					)
					.concat(
						`<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteLocalizedUrl(path, 'ru')}" />`
					)
					.join('\n');
				const depth = path.split('/').filter(Boolean).length;

				return `<url>
			<loc>${getAbsoluteLocalizedUrl(path, locale)}</loc>
			${alternateLinks}
			<lastmod>2026-07-07</lastmod>
			<changefreq>monthly</changefreq>
			<priority>${depth === 0 ? '1.0' : depth === 1 ? '0.8' : '0.7'}</priority>
		</url>`;
			})
		)
		.join('');

	return new Response(
		`
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
        ${urls}
        </urlset>
    `.trim(),
		{ headers: { 'Content-Type': 'application/xml' } }
	);
}) satisfies RequestHandler;
