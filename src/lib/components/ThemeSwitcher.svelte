<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);

		if (localStorage.getItem('theme')) {
			return;
		}
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.getElementsByTagName('html')[0].setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.getElementsByTagName('html')[0].setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}
	});
</script>

<button
	data-toggle-theme="light,dark"
	data-act-class="ACTIVECLASS"
	class="btn btn-ghost btn-circle relative h-10 w-10 cursor-pointer border-none bg-none p-0"
	aria-label="Toggle theme"
>
	<svg class="sun" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M12 19a1 1 0 0 1 .993.883L13 20v1a1 1 0 0 1-1.993.117L11 21v-1a1 1 0 0 1 1-1m6.313-2.09l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7a1 1 0 0 1 1.218-1.567zm-11.306.083a1 1 0 0 1 .083 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094l.7-.7a1 1 0 0 1 1.414 0M4 11a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11zm17 0a1 1 0 0 1 .117 1.993L21 13h-1a1 1 0 0 1-.117-1.993L20 11zM6.213 4.81l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7A1 1 0 0 1 6.11 4.74zm12.894.083a1 1 0 0 1 .083 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094l.7-.7a1 1 0 0 1 1.414 0M12 2a1 1 0 0 1 .993.883L13 3v1a1 1 0 0 1-1.993.117L11 4V3a1 1 0 0 1 1-1m0 5a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7"
		/>
	</svg>

	<svg class="moon" viewBox="0 0 24 24">
		<path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
	</svg>
</button>

<style>
	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 1.5rem;
		height: 1.5rem;
		fill: none;
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.sun {
		opacity: 1;
		transform: translate(-50%, -50%) rotate(0deg);
	}

	.moon {
		opacity: 0;
		transform: translate(-50%, -50%) rotate(90deg);
	}

	:global([data-theme='dark'] .sun) {
		opacity: 0;
		transform: translate(-50%, -50%) rotate(-90deg);
	}

	:global([data-theme='dark'] .moon) {
		opacity: 1;
		transform: translate(-50%, -50%) rotate(0deg);
	}

	button:hover {
		transform: scale(1.1);
	}

	button:active {
		transform: scale(0.9);
	}
</style>
