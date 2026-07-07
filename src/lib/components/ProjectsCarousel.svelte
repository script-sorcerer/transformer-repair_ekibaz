<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { ProjectCarouselItem } from '$lib/seo/project-carousel';
	import { onMount } from 'svelte';

	const AUTO_SCROLL_SPEED = 32;
	const INTERACTION_RESUME_DELAY = 1500;
	const CAROUSEL_COPIES = [0, 1, 2] as const;

	let { items }: { items: ProjectCarouselItem[] } = $props();
	let track: HTMLDivElement;
	let hovered = false;
	let pointerActive = false;
	let pauseUntil = 0;

	const pauseAfterInteraction = () => {
		pauseUntil = performance.now() + INTERACTION_RESUME_DELAY;
	};

	onMount(() => {
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let animationFrame: number;
		let copyWidth = 0;
		let lastFrame = 0;
		let scrollPosition = 0;
		let isAutoScrolling = false;
		let ignoreScrollUntil = 0;

		const canAutoScroll = () => {
			return (
				copyWidth > 0 &&
				!reducedMotion.matches &&
				!hovered &&
				!pointerActive &&
				performance.now() >= pauseUntil
			);
		};

		const runProgrammaticScroll = (scroll: () => void) => {
			isAutoScrolling = true;
			ignoreScrollUntil = performance.now() + 80;
			scroll();
			window.requestAnimationFrame(() => {
				isAutoScrolling = false;
			});
		};

		const normalizeScrollPosition = () => {
			if (copyWidth <= 0) return;

			let nextScrollLeft = scrollPosition;
			while (nextScrollLeft < copyWidth) nextScrollLeft += copyWidth;
			while (nextScrollLeft >= copyWidth * 2) nextScrollLeft -= copyWidth;

			if (nextScrollLeft !== scrollPosition) {
				ignoreScrollUntil = performance.now() + 80;
				scrollPosition = nextScrollLeft;
				track.scrollLeft = nextScrollLeft;
			}
		};

		const measureCarousel = () => {
			const firstCopy = track.querySelector<HTMLElement>('[data-carousel-copy="0"]');
			const secondCopy = track.querySelector<HTMLElement>('[data-carousel-copy="1"]');
			const previousCopyWidth = copyWidth;
			const previousOffset = previousCopyWidth > 0 ? track.scrollLeft - previousCopyWidth : 0;

			copyWidth =
				firstCopy && secondCopy
					? secondCopy.offsetLeft - firstCopy.offsetLeft
					: track.scrollWidth / 3;

			if (copyWidth <= 0 || track.scrollWidth <= track.clientWidth) return;

			runProgrammaticScroll(() => {
				const offset =
					previousCopyWidth > 0 ? Math.max(0, Math.min(previousOffset, copyWidth - 1)) : 0;
				scrollPosition = copyWidth + offset;
				track.scrollLeft = scrollPosition;
				normalizeScrollPosition();
			});
		};

		const handleMouseEnter = () => {
			hovered = true;
		};

		const handleMouseLeave = () => {
			hovered = false;
		};

		const handlePointerDown = () => {
			pointerActive = true;
		};

		const handlePointerRelease = () => {
			if (!pointerActive) return;
			pointerActive = false;
			pauseAfterInteraction();
		};

		const handleWheel = () => {
			pauseAfterInteraction();
		};

		const handleScroll = () => {
			const scrollIsProgrammatic = isAutoScrolling || performance.now() < ignoreScrollUntil;
			if (!scrollIsProgrammatic) {
				scrollPosition = track.scrollLeft;
				pauseAfterInteraction();
			}
			normalizeScrollPosition();
		};

		const moveAutomatically = (timestamp: number) => {
			const elapsed = lastFrame ? Math.min(timestamp - lastFrame, 64) : 0;
			lastFrame = timestamp;

			if (canAutoScroll()) {
				runProgrammaticScroll(() => {
					scrollPosition += (AUTO_SCROLL_SPEED * elapsed) / 1000;
					track.scrollLeft = scrollPosition;
					normalizeScrollPosition();
				});
			}

			animationFrame = window.requestAnimationFrame(moveAutomatically);
		};

		const resizeObserver = new ResizeObserver(measureCarousel);
		measureCarousel();
		resizeObserver.observe(track);
		animationFrame = window.requestAnimationFrame(moveAutomatically);

		track.addEventListener('wheel', handleWheel, { passive: true });
		track.addEventListener('scroll', handleScroll, { passive: true });
		track.addEventListener('pointerenter', handleMouseEnter);
		track.addEventListener('pointerleave', handleMouseLeave);
		track.addEventListener('mouseenter', handleMouseEnter);
		track.addEventListener('mouseleave', handleMouseLeave);
		track.addEventListener('pointerdown', handlePointerDown);
		track.addEventListener('touchstart', handlePointerDown, { passive: true });
		window.addEventListener('pointerup', handlePointerRelease);
		window.addEventListener('pointercancel', handlePointerRelease);
		window.addEventListener('touchend', handlePointerRelease);
		window.addEventListener('touchcancel', handlePointerRelease);

		return () => {
			window.cancelAnimationFrame(animationFrame);
			resizeObserver.disconnect();
			track.removeEventListener('wheel', handleWheel);
			track.removeEventListener('scroll', handleScroll);
			track.removeEventListener('pointerenter', handleMouseEnter);
			track.removeEventListener('pointerleave', handleMouseLeave);
			track.removeEventListener('mouseenter', handleMouseEnter);
			track.removeEventListener('mouseleave', handleMouseLeave);
			track.removeEventListener('pointerdown', handlePointerDown);
			track.removeEventListener('touchstart', handlePointerDown);
			window.removeEventListener('pointerup', handlePointerRelease);
			window.removeEventListener('pointercancel', handlePointerRelease);
			window.removeEventListener('touchend', handlePointerRelease);
			window.removeEventListener('touchcancel', handlePointerRelease);
		};
	});
</script>

<div
	bind:this={track}
	class="projects-carousel rounded-box flex w-full gap-4 overflow-x-auto px-4 py-3"
	role="region"
	aria-label={m.round_gross_dachshund_fetch()}
>
	{#each CAROUSEL_COPIES as copyIndex (copyIndex)}
		{#each items as item (`${copyIndex}-${item.id}`)}
			<a
				class="card bg-base-200 w-[82vw] shrink-0 overflow-hidden shadow-md sm:w-[45vw] lg:w-[min(30vw,24rem)]"
				href={localizeHref(item.href)}
				data-carousel-copy={copyIndex}
				aria-hidden={copyIndex === 1 ? undefined : true}
				tabindex={copyIndex === 1 ? undefined : -1}
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
	{/each}
</div>

<style>
	.projects-carousel {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.projects-carousel::-webkit-scrollbar {
		display: none;
	}
</style>
