import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (() => redirect(301, '/repair/power-transformers')) satisfies PageServerLoad;
