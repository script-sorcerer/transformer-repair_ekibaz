<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
	import { sectionMessages, type SeoPageDefinition } from '$lib/seo';

	let { page }: { page: SeoPageDefinition } = $props();
	const section = sectionMessages[page.kind];
</script>

<nav class="breadcrumbs text-sm" aria-label={m.seo_breadcrumb_label()}>
	<ul>
		<li><a href={localizeHref('/')}>{m.seo_breadcrumb_home()}</a></li>
		<li><a href={localizeHref(`/${page.kind}`)}>{section.title()}</a></li>
		<li aria-current="page">{page.title()}</li>
	</ul>
</nav>
