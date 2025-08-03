<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: m.still_full_millipede_persist(),
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
		description: m.extra_alert_lark_roam()
	};
</script>

<svelte:head>
	<title>{m.odd_mad_gopher_attend()}</title>
	<meta name="description" content={m.small_bland_butterfly_fond()} />
	<meta name="keywords" content={m.lime_fun_jaguar_wish()} />

	<meta property="og:title" content={m.sad_glad_parakeet_trip()} />
	<meta property="og:description" content={m.seemly_formal_quail_reap()} />
	<meta property="og:image" content="https://ekibaz.com/images/transformer-repair.jpg" />
	<meta property="og:url" content="https://ekibaz.com/service-details/transformer-repair" />
	<meta property="og:type" content="article" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m.strong_broad_bobcat_pave()} />
	<meta name="twitter:description" content={m.full_trick_hedgehog_bend()} />
	<meta name="twitter:image" content="https://example.com/images/transformer-repair.jpg" />

	<link
		rel="alternate"
		hreflang="ru-RU"
		href="https://ekibaz.com/service-details/transformer-repair"
	/>
	<link
		rel="alternate"
		hreflang="kk-KZ"
		href="https://ekibaz.com/kk/service-details/transformer-repair"
	/>
	<link
		rel="alternate"
		hreflang="en-US"
		href="https://ekibaz.com/en/service-details/transformer-repair"
	/>
	<link
		rel="alternate"
		hreflang="x-default"
		href="https://ekibaz.com/service-details/transformer-repair"
	/>

	<meta name="geo.region" content="KZ-PAV" />
	<meta name="geo.placename" content={m.big_low_cougar_sail()} />
	<meta name="geo.position" content="75.342822;51.726338" />
	<meta name="robots" content="index, follow, max-image-preview:large" />

	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>

<main class="mt-20 flex justify-center px-4 py-2">
	<article class="prose prose-sm md:prose-base lg:prose-xl">
		<h1>{m.glad_brave_llama_blink()}</h1>

		<p>
			{m.blue_vexed_jaguar_zip()}
		</p>

		<ul>
			<li>
				{m.plain_even_hound_scold()}
			</li>
			<li>{m.fit_cozy_coyote_twirl()}</li>
			<li>{m.loved_fit_javelina_aim()}</li>
		</ul>

		<p>
			{m.sea_calm_llama_belong()}
		</p>

		<p>
			{m.salty_sea_dove_kick()}
		</p>

		<p>
			{m.late_stock_ape_walk()}
		</p>

		<p>{m.such_zippy_spider_reap()}</p>

		<p>
			{m.cozy_legal_finch_boost()}
		</p>

		<h3>
			{m.cuddly_shy_anaconda_enrich()}
		</h3>

		<ul>
			<li>{m.even_bad_dog_advise()}</li>
			<li>{m.vivid_noble_javelina_engage()}</li>
		</ul>

		<h3>{m.zippy_lower_midge_quell()}</h3>

		<ul>
			<li>{m.lost_plain_snake_charm()}</li>
		</ul>

		<p>
			{m.vivid_elegant_otter_pop()}
		</p>
	</article>
</main>
