import type { Attachment } from 'svelte/attachments';

export default function (
	onIntersect: (element: Element) => void,
	options: IntersectionObserverInit = {}
): Attachment {
	return (node) => {
		if (!('IntersectionObserver' in globalThis)) {
			onIntersect(node);
			return;
		}

		let hasIntersected = false;
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting || hasIntersected) continue;

				hasIntersected = true;
				observer.disconnect();
				onIntersect(entry.target);
			}
		}, options);

		observer.observe(node);

		return () => observer.disconnect();
	};
}
