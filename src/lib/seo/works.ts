import { m } from '$lib/paraglide/messages';
import { getPageHref, type GalleryItem, type SeoPageKind } from './content';

type Message = () => string;

export interface WorkDefinition {
	slug: string;
	title: Message;
	relatedPages: Array<{ kind: SeoPageKind; slug: string }>;
	gallery: GalleryItem[];
}

export interface ProjectCarouselItem {
	id: string;
	src: string;
	width: number;
	height: number;
	alt: Message;
	description: Message;
	href: string;
}

interface ImageOptions {
	workSlug: string;
	file: string;
	title: Message;
	number: number;
	width?: number;
	height?: number;
}

const image = ({
	workSlug,
	file,
	title,
	number,
	width = 1200,
	height = 1600
}: ImageOptions): GalleryItem => ({
	type: 'image',
	src: `/media/works/${workSlug}/${file}`,
	width,
	height,
	alt: () => m.seo_gallery_photo_alt({ number, work: title() }),
	caption: title
});

interface VideoOptions {
	workSlug: string;
	file: string;
	poster: string;
	title: Message;
}

const video = ({ workSlug, file, poster, title }: VideoOptions): GalleryItem => ({
	type: 'video',
	src: `/media/works/${workSlug}/${file}`,
	width: 478,
	height: 850,
	poster: `/media/works/${workSlug}/${poster}`,
	hasAudio: false,
	alt: () => m.seo_gallery_video_alt({ work: title() }),
	caption: title
});

const imageSeries = (workSlug: string, count: number, extension: 'jpeg' | 'webp', title: Message) =>
	Array.from({ length: count }, (_, index) =>
		image({
			workSlug,
			file: `${index + 1}.${extension}`,
			title,
			number: index + 1
		})
	);

export const workCatalog: WorkDefinition[] = [
	{
		slug: 'transformer-315-kva-repair',
		title: m.seo_work_315,
		relatedPages: [{ kind: 'repair', slug: 'power-transformers' }],
		gallery: imageSeries('transformer-315-kva-repair', 9, 'webp', m.seo_work_315)
	},
	{
		slug: 'tmg-63-voltage-conversion',
		title: m.seo_work_tmg_63,
		relatedPages: [
			{ kind: 'repair', slug: 'tm-tmz-tmg-transformers' },
			{ kind: 'repair', slug: 'transformer-winding' }
		],
		gallery: imageSeries('tmg-63-voltage-conversion', 3, 'webp', m.seo_work_tmg_63)
	},
	{
		slug: 'transformer-63-ktp',
		title: m.seo_work_ktp_63,
		relatedPages: [
			{ kind: 'repair', slug: 'ktp' },
			{ kind: 'services', slug: 'installation' }
		],
		gallery: [
			image({
				workSlug: 'transformer-63-ktp',
				file: '1.webp',
				title: m.seo_work_ktp_63,
				number: 1,
				width: 478,
				height: 850
			}),
			video({
				workSlug: 'transformer-63-ktp',
				file: '1.mp4',
				poster: '1.webp',
				title: m.seo_work_ktp_63
			}),
			image({
				workSlug: 'transformer-63-ktp',
				file: '2.webp',
				title: m.seo_work_ktp_63,
				number: 2,
				width: 478,
				height: 850
			}),
			image({
				workSlug: 'transformer-63-ktp',
				file: '3.webp',
				title: m.seo_work_ktp_63,
				number: 3
			})
		]
	},
	{
		slug: 'transformer-630-hv-winding',
		title: m.seo_work_winding_630,
		relatedPages: [{ kind: 'repair', slug: 'transformer-winding' }],
		gallery: imageSeries('transformer-630-hv-winding', 4, 'webp', m.seo_work_winding_630)
	},
	{
		slug: 'transformer-1000-repair',
		title: m.seo_work_1000,
		relatedPages: [{ kind: 'repair', slug: 'power-transformers' }],
		gallery: imageSeries('transformer-1000-repair', 1, 'webp', m.seo_work_1000)
	},
	{
		slug: 'tfzm-220-repair',
		title: m.seo_work_tfzm_220,
		relatedPages: [
			{ kind: 'repair', slug: 'oil-transformers' },
			{ kind: 'services', slug: 'diagnostics' }
		],
		gallery: imageSeries('tfzm-220-repair', 2, 'jpeg', m.seo_work_tfzm_220)
	},
	{
		slug: 'dry-transformer-400-modernization',
		title: m.seo_work_dry_400,
		relatedPages: [{ kind: 'repair', slug: 'dry-transformers' }],
		gallery: [
			image({
				workSlug: 'dry-transformer-400-modernization',
				file: '1.jpeg',
				title: m.seo_work_dry_400,
				number: 1
			}),
			video({
				workSlug: 'dry-transformer-400-modernization',
				file: '1.mp4',
				poster: '1.jpeg',
				title: m.seo_work_dry_400
			}),
			image({
				workSlug: 'dry-transformer-400-modernization',
				file: '2.jpeg',
				title: m.seo_work_dry_400,
				number: 2
			})
		]
	},
	{
		slug: 'transformer-1600-removal',
		title: m.seo_work_removal_1600,
		relatedPages: [{ kind: 'services', slug: 'installation' }],
		gallery: [
			image({
				workSlug: 'transformer-1600-removal',
				file: '1.webp',
				title: m.seo_work_removal_1600,
				number: 1,
				width: 1086,
				height: 1448
			})
		]
	},
	{
		slug: 'tmf-1600-maintenance',
		title: m.seo_work_tmf_1600,
		relatedPages: [
			{ kind: 'repair', slug: 'oil-transformers' },
			{ kind: 'repair', slug: 'tm-tmz-tmg-transformers' }
		],
		gallery: imageSeries('tmf-1600-maintenance', 1, 'jpeg', m.seo_work_tmf_1600)
	},
	{
		slug: 'trdns-25000-inspection',
		title: m.seo_work_trdns_25000,
		relatedPages: [
			{ kind: 'repair', slug: 'power-transformers' },
			{ kind: 'services', slug: 'diagnostics' }
		],
		gallery: [
			image({
				workSlug: 'trdns-25000-inspection',
				file: '1.webp',
				title: m.seo_work_trdns_25000,
				number: 1,
				width: 1086,
				height: 1448
			})
		]
	},
	{
		slug: 'tsl-2500-testing',
		title: m.seo_work_tsl_2500,
		relatedPages: [
			{ kind: 'repair', slug: 'dry-transformers' },
			{ kind: 'services', slug: 'testing' }
		],
		gallery: imageSeries('tsl-2500-testing', 1, 'jpeg', m.seo_work_tsl_2500)
	}
];

export const getGalleryForPage = (kind: SeoPageKind, slug: string) =>
	workCatalog
		.filter((work) => work.relatedPages.some((page) => page.kind === kind && page.slug === slug))
		.flatMap((work) => work.gallery);

export const projectCarouselItems: ProjectCarouselItem[] = workCatalog.map((work) => {
	const relatedPage = work.relatedPages[0];
	if (!relatedPage) {
		throw new Error(`Work "${work.slug}" has no related SEO page`);
	}

	const item = work.gallery.find((galleryItem) => galleryItem.type === 'image');
	if (!item) {
		throw new Error(`Work "${work.slug}" has no image for the homepage carousel`);
	}

	return {
		id: work.slug,
		src: item.src,
		width: item.width,
		height: item.height,
		alt: item.alt,
		description: work.title,
		href: getPageHref(relatedPage)
	};
});
