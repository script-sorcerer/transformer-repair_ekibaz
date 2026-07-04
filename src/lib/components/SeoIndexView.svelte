<script lang="ts">
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import {
		getPageHref,
		getSeoLocaleMetadata,
		getSectionPages,
		sectionMessages,
		type SiteLocale,
		type SeoPageKind
	} from '$lib/seo';

	let { kind }: { kind: SeoPageKind } = $props();

	const section = sectionMessages[kind];
	const pages = getSectionPages(kind);
	const seoLocale = getSeoLocaleMetadata(`/${kind}`, getLocale() as SiteLocale);
</script>

<svelte:head>
	<title>{section.metaTitle()}</title>
	<meta name="description" content={section.description()} />
	<meta name="robots" content={seoLocale.indexable ? 'index, follow' : 'noindex, follow'} />
	<link rel="canonical" href={seoLocale.canonical} />
	{#each seoLocale.alternates as alternate}
		<link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={seoLocale.xDefault} />
	<meta property="og:title" content={section.metaTitle()} />
	<meta property="og:description" content={section.description()} />
	<meta property="og:url" content={seoLocale.canonical} />
	<meta property="og:image" content="https://ekibaz.com/hero-bg.webp" />
	<meta property="og:locale" content={seoLocale.ogLocale} />
	{#each seoLocale.ogAlternates as alternate}
		<meta property="og:locale:alternate" content={alternate} />
	{/each}
</svelte:head>

<main class="bg-base-100 min-h-screen pt-20">
	<div class="container mx-auto max-w-6xl space-y-8 px-4 py-12">
		<header class="max-w-3xl space-y-4">
			<h1 class="text-4xl font-bold md:text-6xl">{section.title()}</h1>
			<p class="text-base-content/75 text-xl">{section.description()}</p>
		</header>

		<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each pages as page}
				<a
					class="card card-border bg-base-200 transition hover:-translate-y-1 hover:shadow-lg"
					href={localizeHref(getPageHref(page))}
				>
					<div class="card-body">
						<h2 class="card-title">{page.title()}</h2>
						<p>{page.lead()}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</main>
