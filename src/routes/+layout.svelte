<script lang="ts">
	import '../app.css';
	import { locales, localizeHref, setLocale } from '$lib/paraglide/runtime';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { getAgenticCopy } from '$lib/agentic';
	import { KzFlagIcon, LanguageIcon, RuFlagIcon, ToastIcon, UkFlagIcon } from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { SiteFooter, ThemeSwitcher } from '$lib/components';

	let { children } = $props();

	const localeIcons = {
		kk: KzFlagIcon,
		ru: RuFlagIcon,
		en: UkFlagIcon
	} as const;
	const agentic = getAgenticCopy(getLocale());

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
		<button
			type="button"
			aria-label={agentic.nav.switchLanguage[locale]}
			title={agentic.nav.switchLanguage[locale]}
			onclick={() => setLocale(locale)}
		>
			<div class="w-full max-w-6" aria-hidden="true">
				<Icon />
			</div>
		</button>
	</li>
{/snippet}

<header class="fixed top-0 z-10 w-full">
	<div class="navbar bg-base-100 shadow-sm">
		<div class="navbar-start">
			<div class="dropdown">
				<details class="md:hidden">
					<summary class="btn btn-ghost h-10 w-10">
						<span class="sr-only">{agentic.nav.openMenu}</span>
						<span class="w-6" aria-hidden="true">
							<ToastIcon />
						</span>
					</summary>
					<ul
						class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
					>
						<li>
							<a href={localizeHref('/')}>{m.knotty_new_salmon_belong()}</a>
						</li>
						<li>
							<a href={localizeHref('/repair')}>{m.seo_nav_repair()}</a>
						</li>
						<li>
							<a href={localizeHref('/services')}>{m.seo_nav_services()}</a>
						</li>
						<li><a href={localizeHref('/regions')}>{m.seo_nav_regions()}</a></li>
						<li><a href={localizeHref('/articles')}>{m.seo_nav_articles()}</a></li>
					</ul>
				</details>
			</div>
		</div>

		<div class="navbar-center hidden md:flex">
			<ul class="menu menu-horizontal px-1">
				<li>
					<a href={localizeHref('/')}>{m.knotty_new_salmon_belong()}</a>
				</li>
				<li>
					<a href={localizeHref('/repair')}>{m.seo_nav_repair()}</a>
				</li>
				<li>
					<a href={localizeHref('/services')}>{m.seo_nav_services()}</a>
				</li>
				<li><a href={localizeHref('/regions')}>{m.seo_nav_regions()}</a></li>
				<li><a href={localizeHref('/articles')}>{m.seo_nav_articles()}</a></li>
			</ul>
		</div>

		<div class="navbar-end">
			<ul class="menu menu-horizontal items-center px-1">
				<li>
					<ThemeSwitcher label={agentic.nav.themeToggle} />
				</li>
				<li>
					<details>
						<summary>
							<span class="sr-only">{agentic.nav.languageMenu}</span>
							<div class="w-full max-w-6" aria-hidden="true">
								<LanguageIcon />
							</div>
						</summary>
						<ul class="bg-base-100 rounded-tnone p-2">
							{#each locales as locale (locale)}
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

{#if page.route.id !== '/'}
	<SiteFooter />
{/if}

<div class="hidden">
	{#each locales as locale (locale)}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
