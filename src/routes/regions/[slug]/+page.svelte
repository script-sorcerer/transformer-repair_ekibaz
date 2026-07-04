<script lang="ts">
	import { SeoPageView } from '$lib/components';
	import { getSeoPage } from '$lib/seo';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	const page = getSeoPage('regions', data.slug)!;
</script>

<SeoPageView {page} {form} />
