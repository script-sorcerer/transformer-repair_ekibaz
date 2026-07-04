<script lang="ts">
	import { prefersReducedMotion, Tween } from 'svelte/motion';

	interface Props {
		target: number;
		digitCapacity?: number;
		duration?: number;
		easing?: (t: number) => number;
	}

	let { target, digitCapacity, duration, easing }: Props = $props();

	const value = new Tween(target, { duration, easing });
	let hasRun = false;
	let stringified = $derived(
		digitCapacity
			? `${value.current.toFixed(0)}`.padStart(digitCapacity, '0')
			: `${value.current.toFixed(0)}`
	);

	export async function run() {
		if (hasRun || prefersReducedMotion.current) return;

		hasRun = true;
		await value.set(0, { duration: 0 });
		void value.set(target);
	}
</script>

<data value={target} aria-label={String(target)}>{stringified}</data>
