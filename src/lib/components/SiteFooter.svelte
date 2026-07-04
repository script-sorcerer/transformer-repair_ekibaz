<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
</script>

<footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
	<aside class="max-w-sm">
		<h2 class="text-lg font-bold">{m.shy_still_finch_dare()}</h2>
		<p>{m.seo_footer_description()}</p>
	</aside>
	<nav>
		<h2 class="footer-title">{m.teal_crazy_grizzly_endure()}</h2>
		<a class="link link-hover" href={localizeHref('/repair')}>{m.seo_nav_repair()}</a>
		<a class="link link-hover" href={localizeHref('/services')}>{m.seo_nav_services()}</a>
		<a class="link link-hover" href={localizeHref('/regions')}>{m.seo_nav_regions()}</a>
		<a class="link link-hover" href={localizeHref('/articles')}>{m.seo_nav_articles()}</a>
	</nav>
	<nav>
		<h2 class="footer-title">{m.suave_zany_octopus_lead()}</h2>
		<a href="tel:+77751670032">+7 (775) 167-00-32</a>
		<a href="tel:+77471818112">+7 (747) 181-81-12</a>
		<a href="mailto:ekibaztransformator@gmail.com">ekibaztransformator@gmail.com</a>
	</nav>
</footer>
