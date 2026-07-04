<script lang="ts">
	import { enhance } from '$app/forms';
	import { m } from '$lib/paraglide/messages';

	interface LeadFormState {
		success?: boolean;
		invalidFields?: boolean;
		invalidFile?: boolean;
		name?: string;
		contact?: string;
		capacity?: string;
		voltage?: string;
		fault?: string;
	}

	let {
		source,
		form = null
	}: {
		source: string;
		form?: LeadFormState | null;
	} = $props();

	const whatsappText = encodeURIComponent(`${source}\n${m.seo_cta_text()}`);
</script>

<section class="fieldset bg-base-300 border-neutral/70 rounded-box gap-8 border p-4 md:grid-cols-2">
	<div class="space-y-4">
		<h2 class="text-2xl font-bold md:text-3xl">{m.seo_cta_title()}</h2>
		<p class="text-lg">{m.seo_cta_text()}</p>
		<a
			class="btn btn-neutral"
			href={`https://wa.me/77471818112?text=${whatsappText}`}
			target="_blank"
			rel="noreferrer"
		>
			{m.seo_cta_whatsapp()}
		</a>
	</div>

	<form method="POST" enctype="multipart/form-data" class="grid gap-3" use:enhance>
		<input type="hidden" name="source" value={source} />
		<div class="hidden" aria-hidden="true">
			<label for="company-website">Website</label>
			<input id="company-website" name="website" tabindex="-1" autocomplete="off" />
		</div>

		<label class="form-control">
			<span class="label">{m.seo_form_name()}</span>
			<input class="input input-bordered w-full" name="name" value={form?.name ?? ''} required />
		</label>
		<label class="form-control">
			<span class="label">{m.seo_form_contact()}</span>
			<input
				class="input input-bordered w-full"
				name="contact"
				value={form?.contact ?? ''}
				required
			/>
		</label>
		<div class="grid gap-3 sm:grid-cols-2">
			<label class="form-control">
				<span class="label">{m.seo_form_capacity()}</span>
				<input
					class="input input-bordered w-full"
					name="capacity"
					placeholder={m.seo_form_capacity_placeholder()}
					value={form?.capacity ?? ''}
				/>
			</label>
			<label class="form-control">
				<span class="label">{m.seo_form_voltage()}</span>
				<input
					class="input input-bordered w-full"
					name="voltage"
					placeholder={m.seo_form_voltage_placeholder()}
					value={form?.voltage ?? ''}
				/>
			</label>
		</div>
		<label class="form-control">
			<span class="label">{m.seo_form_fault()}</span>
			<textarea
				class="textarea textarea-bordered min-h-28 w-full"
				name="fault"
				placeholder={m.seo_form_fault_placeholder()}
				value={form?.fault ?? ''}
				required
			></textarea>
		</label>
		<label class="form-control">
			<span class="label">{m.seo_form_photo()}</span>
			<input
				class="file-input file-input-bordered w-full"
				type="file"
				name="photo"
				accept="image/jpeg,image/png,image/webp"
			/>
			<span class="label text-xs">{m.seo_form_photo_hint()}</span>
		</label>

		{#if form?.invalidFields}
			<p class="text-error-content bg-error rounded-box p-3">{m.seo_form_required_error()}</p>
		{/if}
		{#if form?.invalidFile}
			<p class="text-error-content bg-error rounded-box p-3">{m.seo_form_file_error()}</p>
		{/if}
		{#if form?.success}
			<p class="text-success-content bg-success rounded-box p-3">{m.seo_form_success()}</p>
		{:else if form?.success === false}
			<p class="text-error-content bg-error rounded-box p-3">{m.seo_form_error()}</p>
		{/if}

		<button class="btn btn-neutral mt-2" type="submit">{m.seo_form_submit()}</button>
	</form>
</section>
