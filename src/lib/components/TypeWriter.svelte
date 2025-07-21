<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		delay: number;
		duration: number;
		content: string[];
	}

	let { content, delay, duration }: Props = $props();

	let phraseIndex = $state(0);
	let phrase = $state(content[0] ?? '');
	let typedChars = $state('');
	let typingInterval = $state<number>();
	let cleaningInterval = $state<number>();

	onMount(() => {
		typing();
	});

	function calculateIntervalDelay(phrase: string, duration: number) {
		return Math.ceil(duration / phrase.length);
	}

	function typeChar() {
		const nextChar = phrase[typedChars.length];

		if (nextChar) {
			typedChars = `${typedChars}${nextChar}`;
		}
	}

	function typing() {
		typingInterval = setInterval(
			() => {
				if (phrase.length === typedChars.length) {
					stopTyping();
				} else {
					typeChar();
				}
			},
			calculateIntervalDelay(phrase, duration)
		);
	}

	function cleanChar() {
		typedChars = typedChars.slice(0, -1);
	}

	function cleaning() {
		cleaningInterval = setInterval(
			() => {
				if (typedChars.length === 0) {
					stopCleaning();
				} else {
					cleanChar();
				}
			},
			calculateIntervalDelay(phrase, duration)
		);
	}

	function nextPhrase() {
		phraseIndex = (phraseIndex + 1) % content.length;
		phrase = content[phraseIndex];

		typing();
	}

	function stopCleaning() {
		clearInterval(cleaningInterval);

		nextPhrase();
	}

	function stopTyping() {
		clearInterval(typingInterval);

		setTimeout(cleaning, delay);
	}
</script>

{typedChars}
