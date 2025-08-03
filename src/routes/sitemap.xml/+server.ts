import { drizzle } from 'drizzle-orm/d1';
import type { RequestHandler } from './$types';
import { projects } from '$lib/server/db/schema';
import { isNull, desc } from 'drizzle-orm';

export const GET = (async ({ platform }) => {
	let mainLastMod = '2025-08-03';

	if (platform) {
		const db = drizzle(platform.env.DB);
		const [lastProject] = await db
			.select()
			.from(projects)
			.where(isNull(projects.deletedAt))
			.limit(1)
			.orderBy(desc(projects.createdAt));

		if (lastProject) {
			mainLastMod = lastProject.createdAt.toISOString().split('T')[0];
		}
	}

	return new Response(
		`
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://ekibaz.com/</loc>
            <lastmod>${mainLastMod}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://ekibaz.com/service-details/transformer-repair</loc>
            <lastmod>2025-08-03</lastmod>
            <changefreq>yearly</changefreq>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>https://ekibaz.com/service-details/transformer-installation</loc>
            <lastmod>2025-08-03</lastmod>
            <changefreq>yearly</changefreq>
            <priority>0.8</priority>
        </url>
        </urlset>
    `.trim(),
		{ headers: { 'Content-Type': 'application/xml' } }
	);
}) satisfies RequestHandler;
