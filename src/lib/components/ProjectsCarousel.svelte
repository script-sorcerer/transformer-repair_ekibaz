<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { ProjectCarouselItem } from '$lib/seo/works';
	import { onMount } from 'svelte';

	let { items }: { items: ProjectCarouselItem[] } = $props();
	let track: HTMLDivElement;
	let hovered = false;
	let focused = false;
	let interactionUntil = 0;

	const pauseTemporarily = () => {
		interactionUntil = Date.now() + 8000;
	};

	onMount(() => {
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let autoScrolling = false;
		let autoScrollTimer: number | undefined;

		const canAutoScroll = () =>
			!reducedMotion.matches && !hovered && !focused && Date.now() >= interactionUntil;

		const moveAutomatically = () => {
			if (!canAutoScroll() || track.scrollWidth <= track.clientWidth) return;

			const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
			autoScrolling = true;
			track.scrollTo({
				left: atEnd ? 0 : Math.min(track.scrollLeft + 320, track.scrollWidth),
				behavior: 'smooth'
			});

			window.clearTimeout(autoScrollTimer);
			autoScrollTimer = window.setTimeout(() => {
				autoScrolling = false;
			}, 700);
		};

		const handleWheel = (event: WheelEvent) => {
			if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

			const movingRight = event.deltaY > 0;
			const atStart = track.scrollLeft <= 0;
			const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
			if ((movingRight && atEnd) || (!movingRight && atStart)) return;

			event.preventDefault();
			pauseTemporarily();
			track.scrollBy({
				left: event.deltaY,
				behavior: reducedMotion.matches ? 'auto' : 'smooth'
			});
		};

		const handleScroll = () => {
			if (!autoScrolling) pauseTemporarily();
		};

		const handleMouseEnter = () => {
			hovered = true;
		};

		const handleMouseLeave = () => {
			hovered = false;
		};

		const handleFocusIn = () => {
			focused = true;
		};

		const handleFocusOut = (event: FocusEvent) => {
			if (!track.contains(event.relatedTarget as Node | null)) focused = false;
		};

		const interval = window.setInterval(moveAutomatically, 4000);
		track.addEventListener('wheel', handleWheel, { passive: false });
		track.addEventListener('scroll', handleScroll, { passive: true });
		track.addEventListener('mouseenter', handleMouseEnter);
		track.addEventListener('mouseleave', handleMouseLeave);
		track.addEventListener('focusin', handleFocusIn);
		track.addEventListener('focusout', handleFocusOut);
		track.addEventListener('pointerdown', pauseTemporarily);
		track.addEventListener('keydown', pauseTemporarily);

		return () => {
			window.clearInterval(interval);
			window.clearTimeout(autoScrollTimer);
			track.removeEventListener('wheel', handleWheel);
			track.removeEventListener('scroll', handleScroll);
			track.removeEventListener('mouseenter', handleMouseEnter);
			track.removeEventListener('mouseleave', handleMouseLeave);
			track.removeEventListener('focusin', handleFocusIn);
			track.removeEventListener('focusout', handleFocusOut);
			track.removeEventListener('pointerdown', pauseTemporarily);
			track.removeEventListener('keydown', pauseTemporarily);
		};
	});
</script>

<div
	bind:this={track}
	class="rounded-box flex w-full snap-x snap-proximity gap-4 overflow-x-auto px-4 py-3"
	role="region"
	aria-label={m.round_gross_dachshund_fetch()}
>
	{#each items as item (item.id)}
		<a
			class="card bg-base-200 w-[82vw] shrink-0 snap-center overflow-hidden shadow-md sm:w-[45vw] lg:w-[min(30vw,24rem)]"
			href={localizeHref(item.href)}
		>
			<figure class="aspect-[4/3] w-full">
				<img
					class="h-full w-full object-cover"
					src={item.src}
					width={item.width}
					height={item.height}
					alt={item.alt()}
					loading="lazy"
					decoding="async"
				/>
			</figure>
			<div class="card-body p-4">
				<p class="line-clamp-3 text-sm font-medium sm:text-base">{item.description()}</p>
			</div>
		</a>
	{/each}
</div>
