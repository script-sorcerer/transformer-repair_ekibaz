<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: m.light_quaint_beetle_treasure(),
		provider: {
			'@type': 'LocalBusiness',
			name: m.shy_still_finch_dare(),
			address: {
				'@type': 'PostalAddress',
				streetAddress: m.suave_next_lamb_cuddle(),
				addressLocality: m.big_low_cougar_sail(),
				addressCountry: 'KZ'
			},
			telephone: '+7-747-181-8112',
			url: 'https://ekibaz.com/'
		},
		description: m.known_arable_lynx_lend()
	};
</script>

<svelte:head>
	<title>{m.red_mean_lion_favor()}</title>
	<meta name="description" content={m.hour_bald_hedgehog_bless()} />
	<meta name="keywords" content={m.lime_fun_jaguar_wish()} />

	<meta property="og:title" content={m.neat_lazy_nils_trim()} />
	<meta property="og:description" content={m.fair_solid_newt_radiate()} />
	<meta property="og:image" content="https://ekibaz.com/images/transformer-installation.jpg" />
	<meta property="og:url" content="https://ekibaz.com/service-details/transformer-installation" />
	<meta property="og:type" content="article" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m.slow_each_sheep_roam()} />
	<meta name="twitter:description" content={m.tasty_watery_beetle_nurture()} />
	<meta name="twitter:image" content="https://ekibaz.com/images/transformer-installation.jpg" />

	<link
		rel="alternate"
		hreflang="ru-RU"
		href="https://ekibaz.com/service-details/transformer-installation"
	/>
	<link
		rel="alternate"
		hreflang="kk-KZ"
		href="https://ekibaz.com/kk/service-details/transformer-installation"
	/>
	<link
		rel="alternate"
		hreflang="en-US"
		href="https://ekibaz.com/en/service-details/transformer-installation"
	/>
	<link
		rel="alternate"
		hreflang="x-default"
		href="https://ekibaz.com/service-details/transformer-installation"
	/>

	<meta name="geo.region" content="KZ-PAV" />
	<meta name="geo.placename" content={m.big_low_cougar_sail()} />
	<meta name="geo.position" content="75.342822;51.726338" />
	<meta name="robots" content="index, follow, max-image-preview:large" />

	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>

<main class="mt-20 flex justify-center px-4 py-2">
	<article class="prose prose-sm md:prose-base lg:prose-xl">
		<h1>{m.loud_less_parakeet_attend()}</h1>

		<ul>
			<li>{m.royal_lime_hound_nudge()}</li>
			<li>{m.jumpy_chunky_finch_cure()}</li>
			<li>
				{m.north_dull_beetle_pave()}
			</li>
			<li>
				{m.wide_tired_donkey_earn()}
			</li>
		</ul>
	</article>
</main>
