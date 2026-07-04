import { getSeoPage } from '$lib/seo';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	if (!getSeoPage('services', params.slug)) error(404, 'Page not found');
	return { slug: params.slug };
}) satisfies PageLoad;
