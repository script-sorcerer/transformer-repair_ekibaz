import type { Attachment } from 'svelte/attachments';

export default function (onIntersect: (element: Element) => void): Attachment {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					onIntersect(entry.target);
				}
			});
		},
		{
			root: null,
			rootMargin: '10px 0px 0px 0px',
			threshold: 0.3
		}
	);

	return (node) => {
		observer.disconnect();

		observer.observe(node);

		return observer.disconnect;
	};
}
