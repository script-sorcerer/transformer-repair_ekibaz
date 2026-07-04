<script lang="ts">
	import '../app.css';
	import { locales, localizeHref, setLocale } from '$lib/paraglide/runtime';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { KzFlagIcon, LanguageIcon, RuFlagIcon, ToastIcon, UkFlagIcon } from '$lib/icons';
	import { m } from '$lib/paraglide/messages';
	import { SiteFooter, ThemeSwitcher } from '$lib/components';

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
				<div tabindex="0" role="button" class="btn btn-ghost h-6 w-6 md:hidden">
					<ToastIcon />
				</div>

				<ul
					tabindex="0"
					role="menu"
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

{#if page.route.id !== '/'}
	<SiteFooter />
{/if}

<div class="hidden">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
