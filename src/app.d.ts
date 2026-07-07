// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
	}
}

declare module 'dropcss';

declare module 'svelte/elements' {
	export interface HTMLFormAttributes {
		toolname?: string;
		tooldescription?: string;
		toolautosubmit?: boolean | '';
	}

	export interface HTMLInputAttributes {
		toolparamdescription?: string;
	}

	export interface HTMLTextareaAttributes {
		toolparamdescription?: string;
	}
}

export {};
