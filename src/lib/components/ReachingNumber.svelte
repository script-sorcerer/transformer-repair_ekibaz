<script lang="ts">
	import { Tween } from 'svelte/motion';

	interface Props {
		target: number;
		digitCapacity?: number;
		duration?: number;
		easing?: (t: number) => number;
	}

	let { target, digitCapacity, duration, easing }: Props = $props();

	const value = new Tween(0, { duration, easing });
	let stringified = $derived(
		digitCapacity
			? `${value.current.toFixed(0)}`.padStart(digitCapacity, '0')
			: `${value.current.toFixed(0)}`
	);

	export function run() {
		if (value.current === target) {
			return;
		}

		value.set(target);
	}
</script>

{stringified}
