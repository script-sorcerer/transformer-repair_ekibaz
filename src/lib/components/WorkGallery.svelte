<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { GalleryItem } from '$lib/seo';

	type ImageGalleryItem = Extract<GalleryItem, { type: 'image' }>;

	let { items }: { items: GalleryItem[] } = $props();
	let dialog = $state<HTMLDialogElement>();
	let activeImage = $state<ImageGalleryItem | null>(null);

	function openImage(item: ImageGalleryItem) {
		activeImage = item;
		dialog?.showModal();
	}

	function closeImage() {
		dialog?.close();
		activeImage = null;
	}
</script>

{#if items.length > 0}
	<section class="space-y-5" aria-labelledby="work-gallery-heading">
		<h2 id="work-gallery-heading" class="text-2xl font-bold">{m.seo_gallery_heading()}</h2>

		<div class="columns-1 gap-4 sm:columns-2 lg:columns-3">
			{#each items as item}
				<figure class="card bg-base-200 mb-4 break-inside-avoid overflow-hidden shadow-sm">
					{#if item.type === 'image'}
						<button
							type="button"
							class="cursor-zoom-in"
							aria-label={`${m.seo_gallery_open()}: ${item.alt()}`}
							onclick={() => openImage(item)}
						>
							<img
								class="h-auto w-full"
								src={item.src}
								width={item.width}
								height={item.height}
								alt={item.alt()}
								loading="lazy"
								decoding="async"
							/>
						</button>
					{:else}
						<video
							class="h-auto w-full"
							controls
							playsinline
							muted={!item.hasAudio}
							preload="metadata"
							poster={item.poster}
							width={item.width}
							height={item.height}
							aria-label={item.alt()}
						>
							<source src={item.src} />
						</video>
					{/if}
					<figcaption class="px-4 py-3 text-sm">{item.caption()}</figcaption>
				</figure>
			{/each}
		</div>
	</section>

	<dialog
		bind:this={dialog}
		class="modal"
		oncancel={closeImage}
		onclose={() => (activeImage = null)}
	>
		<div class="modal-box max-w-5xl p-3">
			{#if activeImage}
				<img
					class="max-h-[78vh] w-full object-contain"
					src={activeImage.src}
					width={activeImage.width}
					height={activeImage.height}
					alt={activeImage.alt()}
				/>
				<p class="px-2 pt-3">{activeImage.caption()}</p>
			{/if}
			<div class="modal-action mt-3">
				<button type="button" class="btn" onclick={closeImage}>{m.seo_gallery_close()}</button>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button aria-label={m.seo_gallery_close()}>{m.seo_gallery_close()}</button>
		</form>
	</dialog>
{/if}
