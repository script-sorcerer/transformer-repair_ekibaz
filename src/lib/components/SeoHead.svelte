<script lang="ts">
	import { getLocale } from '$lib/paraglide/runtime';
	import {
		getAbsoluteLocalizedUrl,
		getBusinessSchema,
		getGalleryForPage,
		getPageHref,
		getSeoLocaleMetadata,
		toJsonLdScript,
		BUSINESS_ID,
		WEBSITE_ID,
		sectionMessages,
		SITE_URL,
		type SiteLocale,
		type SeoPageDefinition
	} from '$lib/seo';
	import { m } from '$lib/paraglide/messages';

	let { page }: { page: SeoPageDefinition } = $props();

	const path = getPageHref(page);
	const locale = getLocale() as SiteLocale;
	const seoLocale = getSeoLocaleMetadata(path, locale);
	const canonical = seoLocale.canonical;
	const section = sectionMessages[page.kind];
	const schemaType = page.kind === 'articles' ? 'Article' : 'Service';
	const gallery = getGalleryForPage(page.kind, page.slug);
	const galleryImages = gallery
		.filter((item) => item.type === 'image')
		.map((item) => `${SITE_URL}${item.src}`);
	const firstMedia = gallery[0];
	const socialImage = firstMedia
		? `${SITE_URL}${firstMedia.type === 'image' ? firstMedia.src : firstMedia.poster}`
		: `${SITE_URL}/hero-bg.webp`;
	const socialImageWidth = firstMedia?.width ?? 512;
	const socialImageHeight = firstMedia?.height ?? 512;

	const schema = {
		'@context': 'https://schema.org',
		'@graph': [
			getBusinessSchema(),
			{
				'@type': schemaType,
				'@id': `${canonical}#${schemaType.toLowerCase()}`,
				name: page.title(),
				description: page.metaDescription(),
				url: canonical,
				image: galleryImages.length > 0 ? galleryImages : [`${SITE_URL}/hero-bg.webp`],
				provider:
					schemaType === 'Service'
						? {
								'@id': BUSINESS_ID
							}
						: undefined,
				author:
					schemaType === 'Article'
						? {
								'@id': BUSINESS_ID
							}
						: undefined,
				publisher:
					schemaType === 'Article'
						? {
								'@id': BUSINESS_ID
							}
						: undefined,
				mainEntityOfPage:
					schemaType === 'Article'
						? {
								'@id': `${canonical}#webpage`
							}
						: undefined
			},
			{
				'@type': 'WebPage',
				'@id': `${canonical}#webpage`,
				url: canonical,
				name: page.metaTitle(),
				description: page.metaDescription(),
				isPartOf: { '@id': WEBSITE_ID },
				about: { '@id': BUSINESS_ID }
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: m.seo_breadcrumb_home(),
						item: getAbsoluteLocalizedUrl('/', seoLocale.canonicalLocale)
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: section.title(),
						item: getAbsoluteLocalizedUrl(`/${page.kind}`, seoLocale.canonicalLocale)
					},
					{
						'@type': 'ListItem',
						position: 3,
						name: page.title(),
						item: canonical
					}
				]
			}
		]
	};
</script>

<svelte:head>
	<title>{page.metaTitle()}</title>
	<meta name="description" content={page.metaDescription()} />
	<meta
		name="robots"
		content={seoLocale.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}
	/>
	<link rel="canonical" href={canonical} />
	{#each seoLocale.alternates as alternate (alternate.hreflang)}
		<link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={seoLocale.xDefault} />

	<meta property="og:title" content={page.metaTitle()} />
	<meta property="og:description" content={page.metaDescription()} />
	<meta property="og:image" content={socialImage} />
	<meta property="og:image:width" content={String(socialImageWidth)} />
	<meta property="og:image:height" content={String(socialImageHeight)} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content={page.kind === 'articles' ? 'article' : 'website'} />
	<meta property="og:locale" content={seoLocale.ogLocale} />
	{#each seoLocale.ogAlternates as alternate (alternate)}
		<meta property="og:locale:alternate" content={alternate} />
	{/each}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={page.metaTitle()} />
	<meta name="twitter:description" content={page.metaDescription()} />
	<meta name="twitter:image" content={socialImage} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html toJsonLdScript(schema)}
</svelte:head>
