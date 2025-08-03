<script lang="ts">
	import { enhance } from '$app/forms';
	import { intersect } from '$lib/attachments';
	import { ReachingNumber } from '$lib/components';
	import { ArrowsDownLineIcon, InstagramIcon, WhatsappIcon } from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { bounceOut, cubicOut } from 'svelte/easing';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let repairCount: { run(): void };
	let clientCount: { run(): void };

	function getMapWidgetLang() {
		const locale = getLocale();

		switch (locale) {
			case 'ru':
				return 'ru_RU';
			case 'en':
				return 'en_RU';
			case 'kk':
				return 'kk_KZ';
			default:
				return 'ru_RU';
		}
	}

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: m.shy_still_finch_dare(),
		address: {
			'@type': 'PostalAddress',
			streetAddress: m.suave_next_lamb_cuddle(),
			addressLocality: m.big_low_cougar_sail(),
			addressCountry: 'KZ'
		},
		telephone: '+7-747-181-8112',
		url: 'https://ekibaz.com/',
		image: 'https://ekibaz.com/images/logo.jpg',
		description: m.patient_zesty_pug_nourish()
	};
</script>

<svelte:head>
	<title>{m.sad_glad_parakeet_trip()}</title>
	<meta name="description" content={m.silly_dry_porpoise_lock()} />
	<meta name="keywords" content={m.lime_fun_jaguar_wish()} />

	<meta property="og:title" content={m.sad_glad_parakeet_trip()} />
	<meta property="og:description" content={m.nice_fuzzy_panther_breathe()} />
	<meta property="og:image" content="https://ekibaz.com/images/transformer.jpg" />
	<meta property="og:url" content="https://ekibaz.com/" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="ru_RU" />
	<meta property="og:locale:alternate" content="kk_KZ" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m.strong_broad_bobcat_pave()} />
	<meta name="twitter:description" content={m.aqua_east_camel_win()} />
	<meta name="twitter:image" content="https://example.com/images/transformer.jpg" />

	<link rel="alternate" hreflang="ru-RU" href="https://ekibaz.com/" />
	<link rel="alternate" hreflang="kk-KZ" href="https://ekibaz.com/kk/" />
	<link rel="alternate" hreflang="en-US" href="https://ekibaz.com/en/" />
	<link rel="alternate" hreflang="x-default" href="https://ekibaz.com/" />

	<meta name="geo.region" content="KZ-PAV" />
	<meta name="geo.placename" content={m.big_low_cougar_sail()} />
	<meta name="geo.position" content="75.342822;51.726338" />
	<meta name="robots" content="index, follow, max-image-preview:large" />

	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>

<main>
	<section class="relative">
		<div class="hero min-h-screen">
			<div class="hero-overlay"></div>
			<div class="hero-content text-neutral-content text-center">
				<div class="max-w-xl">
					<h1 class="mb-5 text-3xl font-bold md:text-5xl">{m.green_fair_myna_comfort()}</h1>
					<p class="text-xl font-semibold md:text-3xl">{m.tidy_honest_albatross_foster()}</p>
				</div>
			</div>
		</div>

		<div class="absolute bottom-0 w-full pb-1">
			<div class="text-neutral-content mx-auto w-full max-w-14 animate-bounce">
				<ArrowsDownLineIcon />
			</div>
		</div>
	</section>

	<div class="bg-base-100 text-bg-base-content">
		<section id="services" class="relative pt-8">
			<div class="container mx-auto flex flex-col gap-4">
				<div class="flex justify-center">
					<h2 class="marked-heading text-2xl font-semibold">
						{m.teal_crazy_grizzly_endure()}
					</h2>
				</div>

				<div class="relative flex flex-wrap justify-center gap-12 px-4">
					<div
						class="card card-border bg-base-200 max-w-[35rem] opacity-0 shadow-xl"
						{@attach intersect((element) => element.classList.add('animate-fly-in-left'))}
					>
						<div class="card-body">
							<h3 class="card-title">{m.glad_brave_llama_blink()}</h3>
							<p>
								{m.merry_odd_blackbird_propel()}
							</p>

							<div class="card-actions justify-end">
								<a href="/service-details/transformer-repair" class="btn btn-neutral">
									{m.grand_knotty_monkey_bless()}
								</a>
							</div>
						</div>
					</div>

					<div
						class="card card-border bg-base-200 max-w-[35rem] opacity-0 shadow-xl"
						{@attach intersect((element) => element.classList.add('animate-fly-in-left'))}
					>
						<div class="card-body">
							<h3 class="card-title">{m.loud_less_parakeet_attend()}</h3>
							<p>
								{m.pretty_zippy_mule_fall()}
							</p>

							<div class="card-actions justify-end">
								<a href="/service-details/transformer-installation" class="btn btn-neutral">
									{m.grand_knotty_monkey_bless()}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="about-us" class="pt-8">
			<div class="container mx-auto flex flex-col items-center gap-4">
				<div class="flex justify-center">
					<h2 class="marked-heading text-2xl font-semibold">{m.minor_major_anaconda_praise()}</h2>
				</div>

				<div class="prose px-4 py-2">
					<p>
						{m.legal_ornate_puffin_boost()}
					</p>

					<ul>
						<li>{m.top_male_okapi_value()}</li>
						<li>{m.fuzzy_top_carp_adore()}</li>
						<li>{m.inclusive_wacky_cod_wish()}</li>
						<li>{m.solid_male_slug_type()}</li>
						<li>{m.formal_slow_wasp_cherish()}</li>
					</ul>

					<p>
						{m.spare_lofty_javelina_hike()}
					</p>
				</div>
			</div>
		</section>

		<section
			class="bg-accent text-accent-content py-12"
			{@attach intersect(() => {
				repairCount.run();
				clientCount.run();
			})}
		>
			<div class="container mx-auto flex justify-center">
				<div class="stats">
					<div class="stat px-4">
						<div class="stat-value">2011</div>
						<div class="stat-desc">{m.topical_smart_polecat_stir()}</div>
					</div>
					<div class="stat px-4">
						<div class="stat-value">
							&gt;
							<ReachingNumber
								target={1000}
								digitCapacity={4}
								duration={1500}
								easing={cubicOut}
								bind:this={repairCount}
							/>
						</div>
						<div class="stat-desc">{m.pretty_active_gibbon_promise()}</div>
					</div>
					<div class="stat px-4">
						<div class="stat-value">
							&gt;
							<ReachingNumber
								target={200}
								digitCapacity={3}
								duration={1500}
								easing={cubicOut}
								bind:this={clientCount}
							/>
						</div>
						<div class="stat-desc">{m.that_honest_pelican_empower()}</div>
					</div>
				</div>
			</div>
		</section>

		<section id="projects" class="pt-8">
			<div class="container mx-auto">
				<div class="flex justify-center">
					<h2 class="marked-heading text-2xl font-semibold">{m.round_gross_dachshund_fetch()}</h2>
				</div>
			</div>
		</section>

		<section class="pt-8">
			<div class="container mx-auto flex flex-col gap-4">
				<div class="flex justify-center">
					<h2 class="marked-heading text-2xl font-semibold">{m.tense_these_tern_renew()}</h2>
				</div>

				<div class="flex flex-wrap justify-center gap-6">
					<a
						href="https://kbienergy.kz/"
						target="_blank"
						rel="noreferrer"
						class="bg-base-200 rounded-box flex items-center gap-2 px-4 py-2 shadow-md"
					>
						<div>
							<img class="rounded-box h-auto w-37" src="/kbi-logo.webp" alt="Логотип KBI Energy" />
						</div>
					</a>

					<a
						href="https://www.prommash.kz/"
						target="_blank"
						rel="noreferrer"
						class="bg-base-200 rounded-box flex items-center gap-2 px-4 py-2 shadow-md"
					>
						<div>
							<img
								class="rounded-box min-w-10"
								src="/promash-logo.svg"
								alt={m.orange_keen_mule_persist()}
							/>
						</div>
					</a>

					<a
						href="https://www.bogatyr.kz/"
						target="_blank"
						rel="noreferrer"
						class="bg-base-200 rounded-box flex items-center gap-2 px-4 py-2 shadow-md"
					>
						<div>
							<img
								class="rounded-box min-w-10"
								src="/bogatyr-logo.webp"
								alt={m.giant_vexed_crocodile_read()}
							/>
						</div>
					</a>

					<a
						href="https://gres2.kz/"
						target="_blank"
						rel="noreferrer"
						class="bg-base-200 rounded-box flex items-center gap-2 px-4 py-2 shadow-md"
					>
						<div>
							<img
								class="rounded-box min-w-10"
								src="/gres-2-logo.webp"
								alt={m.true_mean_buzzard_hike()}
							/>
						</div>
					</a>

					<div class="bg-base-200 rounded-box flex items-center gap-2 px-4 py-2 shadow-md">
						<div>
							<img
								class="rounded-box min-w-10"
								src="/angrensor-logo.webp"
								alt="Логотип Ангренсор Энерого"
							/>
						</div>
					</div>

					<div class="bg-base-200 rounded-box flex items-center gap-2 px-4 py-2 shadow-md">
						<div>
							<img
								class="rounded-box min-w-10"
								src="/pves-logo.svg"
								alt={m.bland_zany_samuel_cheer()}
							/>
						</div>
						<div>
							<a class="link" href="https://pves.kz/ru/" target="_blank" rel="noreferrer">
								{m.slow_direct_yak_mend()}
							</a>
						</div>
					</div>

					<div class="bg-base-200 rounded-box flex items-center gap-2 px-4 py-2 shadow-md">
						<div>
							<a class="link" href="https://www.maikainzoloto.kz/" target="_blank" rel="noreferrer"
								>{m.calm_red_walrus_hack()}</a
							>
						</div>
					</div>

					<div class="bg-base-200 rounded-box flex items-center gap-2 px-4 py-2 shadow-md">
						<div>Майкаинский известковый завод</div>
					</div>

					<div class="bg-base-200 rounded-box flex items-center gap-2 px-4 py-2 shadow-md">
						<div>{m.topical_tame_donkey_buzz()}</div>
					</div>
				</div>
			</div>
		</section>

		<section id="contacts" class="py-8">
			<div class="container mx-auto">
				<div class="container mx-auto">
					<div class="flex justify-center">
						<h2 class="marked-heading text-2xl font-semibold">{m.deft_mealy_beaver_seek()}</h2>
					</div>
				</div>

				<div class="relative mt-4 flex justify-center overflow-hidden">
					<a
						href="https://yandex.kz/maps/ru/org/transformatorlardy_zhondeu/111640043673/?lang=ru&utm_medium=mapframe&utm_source=maps"
						style="color:#eee;font-size:12px;position:absolute;top:0px;"
						>{m.tasty_such_thrush_flop()}</a
					><a
						href="https://yandex.kz/maps/ru/29590/ekibastuz/category/electrical_equipment_repairs/184107046/?lang=ru&utm_medium=mapframe&utm_source=maps"
						style="color:#eee;font-size:12px;position:absolute;top:14px;"
						>{m.mealy_lower_blackbird_arrive()}</a
					><iframe
						title={m.formal_bald_iguana_absorb()}
						src="https://yandex.kz/map-widget/v1/?ll=75.342822%2C51.726338&mode=poi&poi%5Bpoint%5D=75.342499%2C51.726237&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D111640043673&z=18&lang={getMapWidgetLang()}"
						class="flex-1"
						width="560"
						height="400"
						frameborder="1"
						allowfullscreen={true}
						style="position:relative;"
					></iframe>
				</div>
			</div>
		</section>
	</div>
</main>

<footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
	<form method="POST" class="flex justify-center sm:place-self-end-safe sm:pr-8" use:enhance>
		<fieldset class="fieldset bg-base-300 border-neutral/70 rounded-box w-xs border p-4">
			<legend class="fieldset-legend">{m.long_inclusive_bat_link()}</legend>

			<label class="label" for="ask-name">
				{m.cozy_nice_jackal_aid()}
			</label>
			<input
				id="ask-name"
				type="text"
				name="name"
				class="input rounded-4xl"
				placeholder={m.cozy_nice_jackal_aid()}
				value={form?.email ?? ''}
				required
			/>
			{#if form?.missingName}
				<p class="label text-error">{m.frail_soft_cuckoo_commend()}</p>
			{/if}

			<label class="label" for="ask-email">{m.gray_mellow_lion_kiss()}</label>
			<input
				id="ask-email"
				type="email"
				name="email"
				class="input rounded-4xl"
				placeholder={m.gray_mellow_lion_kiss()}
				value={form?.email ?? ''}
				required
			/>
			{#if form?.missingEmail}
				<p class="label text-error">{m.lost_wacky_gopher_bake()}</p>
			{/if}

			<label class="label" for="ask-message">{m.sad_icy_lark_prosper()}</label>
			<textarea
				id="ask-message"
				name="message"
				class="textarea rounded-2xl"
				placeholder={m.sad_icy_lark_prosper()}
				value={form?.message ?? ''}
				required
			></textarea>
			{#if form?.missingMessage}
				<p class="label text-error">{m.icy_frail_haddock_pave()}</p>
			{/if}
			{#if form?.emptyMessage}
				<p class="label text-error">{m.icy_frail_haddock_pave()}</p>
			{/if}
			{#if form?.tooLongMessage}
				<p class="label text-error">{m.that_blue_samuel_pause()}</p>
			{/if}

			<button class="btn btn-neutral mt-4 rounded-4xl">
				{m.good_low_grizzly_chop()}
			</button>

			{#if form?.success}
				<p class="text-success">{m.sad_giant_gorilla_snap()}</p>
			{/if}
			{#if form?.success === false}
				<p class="text-error">{m.extra_ideal_meerkat_clap()}</p>
			{/if}
		</fieldset>
	</form>

	<nav>
		<h6 class="footer-title">{m.suave_zany_octopus_lead()}</h6>
		<a href="tel:+77751670032">+7 (775) 167-00-32</a>
		<a href="tel:+77471818112">+7 (747) 181-81-12</a>
		<a href="mailto:ekibaztransformator@gmail.com">ekibaztransformator@gmail.com</a>
	</nav>
	<nav>
		<h6 class="footer-title">{m.dizzy_weary_gazelle_wave()}</h6>
		<div class="grid grid-flow-col gap-4">
			<a href="https://www.instagram.com/remonttransformatorov/" target="_blank" rel="noreferrer">
				<InstagramIcon />
			</a>
			<a href="https://wa.me/+77471818112" target="_blank" rel="noreferrer">
				<WhatsappIcon />
			</a>
		</div>
	</nav>
</footer>

<style>
	.marked-heading {
		display: inline-block;

		&::after {
			content: '';
			display: block;
			width: 80%;
			height: 7px;
			background-color: var(--color-accent);
			opacity: 0.5;
			margin: 0.2rem auto 0;
		}
	}

	section:has(.hero)::before {
		content: '';
		position: fixed;
		z-index: -999;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background:
			linear-gradient(to bottom, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.85)), url('/hero-bg.webp');
		background-size: cover;
		background-position: center top;
	}
</style>
