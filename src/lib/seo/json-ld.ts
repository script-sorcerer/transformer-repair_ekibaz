const toJsonLd = (schema: unknown) => JSON.stringify(schema).replaceAll('<', '\\u003c');

export const toJsonLdScript = (schema: unknown) =>
	`<script type="application/ld+json">${toJsonLd(schema)}<${'/'}script>`;
