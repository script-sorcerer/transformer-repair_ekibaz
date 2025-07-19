<script lang="ts">
	import { ArrowsDownLineIcon } from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';

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
</script>

<header></header>

<main>
	<section class="relative">
		<div class="hero min-h-screen" style="background-image: url('/hero-bg.webp')">
			<div class="hero-overlay"></div>
			<div class="hero-content text-neutral-content text-center">
				<div class="max-w-xl">
					<h1 class="mb-5 text-3xl font-bold md:text-5xl">{m.tidy_honest_albatross_foster()}</h1>
				</div>
			</div>
		</div>

		<div class="absolute bottom-0 w-full pb-1">
			<div class="text-neutral-content mx-auto max-w-14 animate-bounce">
				<ArrowsDownLineIcon />
			</div>
		</div>
	</section>

	<section class="relative pt-8">
		<div class="container mx-auto flex flex-col gap-4">
			<div class="flex justify-center">
				<h2 class="marked-heading text-2xl font-semibold">
					{m.teal_crazy_grizzly_endure()}
				</h2>
			</div>

			<div class="relative flex flex-col items-center gap-12 px-4">
				<div
					class="bg-base-200 border-base-300 prose prose-sm md:prose-base lg:prose-xl sticky top-8 h-[80vh] max-w-3xl overflow-y-scroll rounded-2xl border-2 px-4 py-2 shadow-lg"
				>
					<h3 class="text-xl">{m.glad_brave_llama_blink()}</h3>

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
				</div>

				<div
					class="bg-base-200 border-base-300 prose prose-sm md:prose-base lg:prose-xl sticky top-8 h-[80vh] max-w-3xl overflow-y-scroll rounded-2xl border-2 px-4 py-2 shadow-lg"
				>
					<h3 class="text-xl">{m.loud_less_parakeet_attend()}</h3>

					<p>
						{m.pretty_zippy_mule_fall()}
					</p>

					<ul>
						<li>
							{m.awful_green_gibbon_imagine()}
						</li>
						<li>{m.basic_spry_hare_grace()}</li>
						<li>{m.broad_weird_snail_beam()}</li>
						<li>{m.jumpy_patient_iguana_favor()}</li>
					</ul>
				</div>

				<div
					class="bg-base-200 border-base-300 prose prose-sm md:prose-base lg:prose-xl sticky top-8 h-[80vh] max-w-3xl overflow-y-scroll rounded-2xl border-2 px-4 py-2 shadow-lg"
				>
					<h3 class="text-xl">{m.every_direct_tiger_earn()}</h3>

					<p>
						{m.pretty_low_kestrel_bump()}
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="pt-8">
		<div class="container mx-auto flex flex-col gap-4">
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

	<section class="bg-accent text-accent-content py-12">
		<div class="stats">
			<div class="stat">
				<div class="stat-value">2011</div>
				<div class="stat-desc">{m.topical_smart_polecat_stir()}</div>
			</div>
			<div class="stat">
				<div class="stat-value">700 &lt;</div>
				<div class="stat-desc">{m.pretty_active_gibbon_promise()}</div>
			</div>
			<div class="stat">
				<div class="stat-value">&gt; 200</div>
				<div class="stat-desc">{m.that_honest_pelican_empower()}</div>
			</div>
		</div>
	</section>

	<section class="pt-8">
		<div class="container mx-auto">
			<div class="flex justify-center">
				<h2 class="marked-heading text-2xl font-semibold">{m.round_gross_dachshund_fetch()}</h2>
			</div>
		</div>
	</section>

	<section class="pt-8">
		<div class="container mx-auto">
			<div class="flex justify-center">
				<h2 class="marked-heading text-2xl font-semibold">{m.tense_these_tern_renew()}</h2>
			</div>
		</div>
	</section>

	<section class="py-8">
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
</main>

<footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
	<form action="POST" class="flex justify-center">
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
			/>

			<label class="label" for="ask-email">{m.gray_mellow_lion_kiss()}</label>
			<input
				id="ask-email"
				type="text"
				name="email"
				class="input rounded-4xl"
				placeholder={m.gray_mellow_lion_kiss()}
			/>

			<label class="label" for="ask-message">{m.sad_icy_lark_prosper()}</label>
			<textarea
				id="ask-message"
				name="message"
				class="textarea rounded-2xl"
				placeholder={m.sad_icy_lark_prosper()}
			></textarea>

			<button class="btn btn-neutral mt-4 rounded-4xl" type="submit"
				>{m.good_low_grizzly_chop()}</button
			>
		</fieldset>
	</form>

	<nav>
		<h6 class="footer-title">{m.suave_zany_octopus_lead()}</h6>
		<a href="tel://77751670032">+7 (775) 167-00-32</a>
		<a href="tel://77471818112">+7 (747) 181-81-12</a>
		<a href="mailto:ekibaztransformator@gmail.com">ekibaztransformator@gmail.com</a>
		<a href="geo:51.726235,75.342502">{m.maroon_known_wallaby_agree()}</a>
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
</style>
