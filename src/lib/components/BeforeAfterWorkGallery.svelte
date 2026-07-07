<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import type { BeforeAfterGallerySection, ImageGalleryItem } from '$lib/seo';

	let {
		sections,
		beforeLabel = m.seo_gallery_before_label,
		afterLabel = m.seo_gallery_after_label,
		maxHeight = 'min(72vh, 42rem)'
	}: {
		sections: BeforeAfterGallerySection[];
		beforeLabel?: () => string;
		afterLabel?: () => string;
		maxHeight?: string;
	} = $props();

	let dialog = $state<HTMLDialogElement>();
	let activeImage = $state<ImageGalleryItem | null>(null);

	const visibleSections = $derived(
		sections.filter((section) => section.before.length > 0 || section.after.length > 0)
	);

	function openImage(item: ImageGalleryItem) {
		activeImage = item;
		dialog?.showModal();
	}

	function closeImage() {
		dialog?.close();
		activeImage = null;
	}

	function sectionLabel(section: BeforeAfterGallerySection) {
		return section.title();
	}
</script>

{#if visibleSections.length > 0}
	<div class="space-y-6">
		{#each visibleSections as section (section.id)}
			<section class="space-y-3" aria-labelledby={`before-after-section-${section.id}`}>
				<h3 id={`before-after-section-${section.id}`} class="text-lg font-semibold">
					{section.title()}
				</h3>

				<div class="grid grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] gap-2 sm:gap-4">
					<div class="min-w-0 space-y-2">
						<p class="text-base-content/70 text-xs font-bold tracking-widest uppercase">
							{beforeLabel()}
						</p>
						<div
							class="rounded-box border-base-300 bg-base-100 overflow-y-auto border p-2"
							style:max-height={maxHeight}
							role="region"
							aria-label={`${beforeLabel()}: ${sectionLabel(section)}`}
						>
							<div class="grid grid-cols-1 justify-items-center gap-4">
								{#each section.before as item (item.src)}
									<figure class="card bg-base-200 w-full max-w-xl overflow-hidden shadow-sm">
										<button
											type="button"
											class="block w-full cursor-zoom-in"
											aria-label={`${m.seo_gallery_open()}: ${item.alt()}`}
											onclick={() => openImage(item)}
										>
											<img
												class="h-auto w-full"
												src={item.thumbSrc ?? item.src}
												width={item.width}
												height={item.height}
												alt={item.alt()}
												loading="lazy"
												decoding="async"
											/>
										</button>
									</figure>
								{/each}
							</div>
						</div>
					</div>

					<div class="bg-base-content/15 w-px self-stretch" aria-hidden="true"></div>

					<div class="min-w-0 space-y-2">
						<p class="text-base-content/70 text-xs font-bold tracking-widest uppercase">
							{afterLabel()}
						</p>
						<div
							class="rounded-box border-base-300 bg-base-100 overflow-y-auto border p-2"
							style:max-height={maxHeight}
							role="region"
							aria-label={`${afterLabel()}: ${sectionLabel(section)}`}
						>
							<div class="grid grid-cols-1 justify-items-center gap-4">
								{#each section.after as item (item.src)}
									<figure class="card bg-base-200 w-full max-w-xl overflow-hidden shadow-sm">
										<button
											type="button"
											class="block w-full cursor-zoom-in"
											aria-label={`${m.seo_gallery_open()}: ${item.alt()}`}
											onclick={() => openImage(item)}
										>
											<img
												class="h-auto w-full"
												src={item.thumbSrc ?? item.src}
												width={item.width}
												height={item.height}
												alt={item.alt()}
												loading="lazy"
												decoding="async"
											/>
										</button>
									</figure>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</section>
		{/each}
	</div>

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
