<script lang="ts">
	import '../app.css';
	import { locales, localizeHref, setLocale } from '$lib/paraglide/runtime';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { KzFlagIcon, LanguageIcon, RuFlagIcon, ToastIcon, UkFlagIcon } from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { ThemeSwitcher } from '$lib/components';

	let { children } = $props();

	const localeIcons = {
		kk: KzFlagIcon,
		ru: RuFlagIcon,
		en: UkFlagIcon
	} as const;

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

{#snippet languageSwitcher(locale: keyof typeof localeIcons)}
	{@const Icon = localeIcons[locale]}
	<li>
		<button onclick={() => setLocale(locale)}>
			<div class="w-full max-w-6">
				<Icon />
			</div>
		</button>
	</li>
{/snippet}

<header class="fixed top-0 z-10 w-full">
	<div class="navbar bg-base-100 shadow-sm">
		<div class="navbar-start">
			<div class="dropdown">
				<button class="btn btn-ghost h-6 w-6 md:hidden">
					<ToastIcon />
				</button>

				<ul
					tabindex="0"
					role="menu"
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
				>
					<li>
						<a href="/">{m.knotty_new_salmon_belong()}</a>
					</li>
					<li>
						<a href="/#services">{m.teal_crazy_grizzly_endure()}</a>
					</li>
					<li>
						<a href="/#about-us">{m.minor_major_anaconda_praise()}</a>
					</li>
					<li><a href="/#projects">{m.round_gross_dachshund_fetch()}</a></li>
					<li><a href="/#contacts">{m.suave_zany_octopus_lead()}</a></li>
				</ul>
			</div>
		</div>

		<div class="navbar-center hidden md:flex">
			<ul class="menu menu-horizontal px-1">
				<li>
					<a href="/">{m.knotty_new_salmon_belong()}</a>
				</li>
				<li>
					<a href="/#services">{m.teal_crazy_grizzly_endure()}</a>
				</li>
				<li>
					<a href="/#about-us">{m.minor_major_anaconda_praise()}</a>
				</li>
				<li><a href="/#projects">{m.round_gross_dachshund_fetch()}</a></li>
				<li><a href="/#contacts">{m.suave_zany_octopus_lead()}</a></li>
			</ul>
		</div>

		<div class="navbar-end">
			<ul class="menu menu-horizontal items-center px-1">
				<li>
					<ThemeSwitcher />
				</li>
				<li>
					<details>
						<summary>
							<div class="w-full max-w-6">
								<LanguageIcon />
							</div>
						</summary>
						<ul class="bg-base-100 rounded-tnone p-2">
							{#each locales as locale}
								{@render languageSwitcher(locale)}
							{/each}
						</ul>
					</details>
				</li>
			</ul>
		</div>
	</div>
</header>

{@render children()}

<div class="hidden">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
