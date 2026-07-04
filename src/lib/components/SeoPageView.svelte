<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
	import {
		getGalleryForPage,
		getPageHref,
		getSeoPage,
		sectionMessages,
		type SeoPageDefinition
	} from '$lib/seo';
	import Breadcrumbs from './Breadcrumbs.svelte';
	import LeadForm from './LeadForm.svelte';
	import SeoHead from './SeoHead.svelte';
	import WorkGallery from './WorkGallery.svelte';

	interface LeadFormState {
		success?: boolean;
		invalidFields?: boolean;
		invalidFile?: boolean;
		name?: string;
		contact?: string;
		capacity?: string;
		voltage?: string;
		fault?: string;
	}

	let {
		page,
		form = null
	}: {
		page: SeoPageDefinition;
		form?: LeadFormState | null;
	} = $props();

	const gallery = getGalleryForPage(page.kind, page.slug);
	const section = sectionMessages[page.kind];
</script>

<SeoHead {page} />

<main class="bg-base-100 min-h-screen pt-20">
	<div class="container mx-auto max-w-5xl space-y-12 px-4 py-8 md:py-12">
		<Breadcrumbs {page} />

		<header class="max-w-4xl space-y-5">
			<p class="text-accent text-sm font-bold tracking-widest uppercase">
				{section.title()}
			</p>
			<h1 class="text-4xl leading-tight font-bold md:text-6xl">{page.title()}</h1>
			<p class="text-base-content/75 text-xl leading-relaxed">{page.lead()}</p>
		</header>

		<article class="space-y-10">
			{#each page.sections as section}
				<section class="prose md:prose-lg max-w-none">
					<h2>{section.heading()}</h2>
					{#each section.paragraphs ?? [] as paragraph}
						<p>{paragraph()}</p>
					{/each}
					{#if section.items?.length}
						<ul>
							{#each section.items as item}
								<li>{item()}</li>
							{/each}
						</ul>
					{/if}
				</section>
			{/each}
		</article>

		<WorkGallery items={gallery} />

		<section class="space-y-5" aria-labelledby="related-heading">
			<h2 id="related-heading" class="text-2xl font-bold">{m.seo_related_heading()}</h2>
			<div class="grid gap-4 md:grid-cols-3">
				{#each page.related as relation}
					{@const relatedPage = getSeoPage(relation.kind, relation.slug)}
					{#if relatedPage}
						<a
							class="card card-border bg-base-200 transition hover:-translate-y-1 hover:shadow-md"
							href={localizeHref(getPageHref(relatedPage))}
						>
							<div class="card-body">
								<h3 class="card-title text-lg">{relatedPage.title()}</h3>
								<p class="line-clamp-3">{relatedPage.lead()}</p>
							</div>
						</a>
					{/if}
				{/each}
			</div>
		</section>

		<LeadForm source={page.title()} {form} />
	</div>
</main>
