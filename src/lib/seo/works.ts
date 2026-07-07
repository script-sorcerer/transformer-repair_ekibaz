import { m } from '$lib/paraglide/messages';
import {
	getPageHref,
	type BeforeAfterGallerySection,
	type GalleryItem,
	type SeoPageKind,
	type ImageGalleryItem
} from './content';

type Message = () => string;

export interface ProjectCarouselItem {
	id: string;
	src: string;
	width: number;
	height: number;
	alt: Message;
	description: Message;
	href: string;
}

export interface WorkDefinition {
	slug: string;
	title: Message;
	relatedPages: Array<{ kind: SeoPageKind; slug: string }>;
	gallery: GalleryItem[];
	beforeAfterGallery?: BeforeAfterGallerySection[];
	carouselItem: GalleryItem;
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
}: ImageOptions): ImageGalleryItem => ({
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
		gallery: [],
		beforeAfterGallery: [
			{
				id: '315',
				title: m.seo_work_315,
				before: [
					image({
						workSlug: 'transformer-315-kva-repair',
						file: '1.webp',
						title: m.seo_work_315,
						number: 1
					}),
					image({
						workSlug: 'transformer-315-kva-repair',
						file: '2.webp',
						title: m.seo_work_315,
						number: 2
					}),
					image({
						workSlug: 'transformer-315-kva-repair',
						file: '3.webp',
						title: m.seo_work_315,
						number: 3
					}),
					image({
						workSlug: 'transformer-315-kva-repair',
						file: '4.webp',
						title: m.seo_work_315,
						number: 4
					}),
					image({
						workSlug: 'transformer-315-kva-repair',
						file: '5.webp',
						title: m.seo_work_315,
						number: 5
					})
				],
				after: [
					image({
						workSlug: 'transformer-315-kva-repair',
						file: '6.webp',
						title: m.seo_work_315,
						number: 6
					}),
					image({
						workSlug: 'transformer-315-kva-repair',
						file: '7.webp',
						title: m.seo_work_315,
						number: 7
					}),
					image({
						workSlug: 'transformer-315-kva-repair',
						file: '8.webp',
						title: m.seo_work_315,
						number: 8
					}),
					image({
						workSlug: 'transformer-315-kva-repair',
						file: '9.webp',
						title: m.seo_work_315,
						number: 9
					})
				]
			}
		],
		carouselItem: image({
			workSlug: 'transformer-315-kva-repair',
			file: '8.webp',
			title: m.seo_work_315,
			number: 1
		})
	},
	{
		slug: 'tmg-63-voltage-conversion',
		title: m.seo_work_tmg_63,
		relatedPages: [
			{ kind: 'repair', slug: 'tm-tmz-tmg-transformers' },
			{ kind: 'repair', slug: 'transformer-winding' }
		],
		gallery: imageSeries('tmg-63-voltage-conversion', 3, 'webp', m.seo_work_tmg_63),
		carouselItem: image({
			workSlug: 'tmg-63-voltage-conversion',
			file: '1.webp',
			title: m.seo_work_tmg_63,
			number: 1
		})
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
		],
		carouselItem: image({
			workSlug: 'transformer-63-ktp',
			file: '1.webp',
			title: m.seo_work_ktp_63,
			number: 1
		})
	},
	{
		slug: 'transformer-630-hv-winding',
		title: m.seo_work_winding_630,
		relatedPages: [{ kind: 'repair', slug: 'transformer-winding' }],
		gallery: [],
		beforeAfterGallery: [
			{
				id: 'winding',
				title: m.seo_work_winding_630,
				before: [
					image({
						workSlug: 'transformer-630-hv-winding',
						file: '1.webp',
						title: m.seo_work_winding_630,
						number: 1
					}),
					image({
						workSlug: 'transformer-630-hv-winding',
						file: '2.webp',
						title: m.seo_work_winding_630,
						number: 2
					})
				],
				after: [
					image({
						workSlug: 'transformer-630-hv-winding',
						file: '3.webp',
						title: m.seo_work_winding_630,
						number: 3
					}),
					image({
						workSlug: 'transformer-630-hv-winding',
						file: '4.webp',
						title: m.seo_work_winding_630,
						number: 4
					})
				]
			}
		],
		carouselItem: image({
			workSlug: 'transformer-630-hv-winding',
			file: '4.webp',
			title: m.seo_work_winding_630,
			number: 1
		})
	},
	{
		slug: 'transformer-1000-repair',
		title: m.seo_work_1000,
		relatedPages: [{ kind: 'repair', slug: 'power-transformers' }],
		gallery: imageSeries('transformer-1000-repair', 1, 'webp', m.seo_work_1000),
		carouselItem: image({
			workSlug: 'transformer-1000-repair',
			file: '1.webp',
			title: m.seo_work_1000,
			number: 1
		})
	},
	{
		slug: 'tfzm-220-repair',
		title: m.seo_work_tfzm_220,
		relatedPages: [
			{ kind: 'repair', slug: 'oil-transformers' },
			{ kind: 'services', slug: 'diagnostics' }
		],
		gallery: imageSeries('tfzm-220-repair', 2, 'jpeg', m.seo_work_tfzm_220),
		carouselItem: image({
			workSlug: 'tfzm-220-repair',
			file: '1.jpeg',
			title: m.seo_work_tfzm_220,
			number: 1
		})
	},
	{
		slug: 'dry-transformer-400-modernization',
		title: m.seo_work_dry_400,
		relatedPages: [{ kind: 'repair', slug: 'dry-transformers' }],
		gallery: [
			video({
				workSlug: 'dry-transformer-400-modernization',
				file: '1.mp4',
				poster: '1.jpeg',
				title: m.seo_work_dry_400
			})
		],
		beforeAfterGallery: [
			{
				id: 'dry-transformer-400-modernization',
				title: m.seo_work_dry_400,
				before: [
					image({
						workSlug: 'dry-transformer-400-modernization',
						file: '2.jpeg',
						title: m.seo_work_dry_400,
						number: 1
					})
				],
				after: [
					image({
						workSlug: 'dry-transformer-400-modernization',
						file: '1.jpeg',
						title: m.seo_work_dry_400,
						number: 2
					})
				]
			}
		],
		carouselItem: image({
			workSlug: 'dry-transformer-400-modernization',
			file: '1.jpeg',
			title: m.seo_work_dry_400,
			number: 1
		})
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
		],
		carouselItem: image({
			workSlug: 'transformer-1600-removal',
			file: '1.webp',
			title: m.seo_work_removal_1600,
			number: 1
		})
	},
	{
		slug: 'tmf-1600-maintenance',
		title: m.seo_work_tmf_1600,
		relatedPages: [
			{ kind: 'repair', slug: 'oil-transformers' },
			{ kind: 'repair', slug: 'tm-tmz-tmg-transformers' }
		],
		gallery: imageSeries('tmf-1600-maintenance', 1, 'jpeg', m.seo_work_tmf_1600),
		carouselItem: image({
			workSlug: 'tmf-1600-maintenance',
			file: '1.jpeg',
			title: m.seo_work_tmf_1600,
			number: 1
		})
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
		],
		carouselItem: image({
			workSlug: 'trdns-25000-inspection',
			file: '1.webp',
			title: m.seo_work_trdns_25000,
			number: 1
		})
	},
	{
		slug: 'tsl-2500-testing',
		title: m.seo_work_tsl_2500,
		relatedPages: [
			{ kind: 'repair', slug: 'dry-transformers' },
			{ kind: 'services', slug: 'testing' }
		],
		gallery: imageSeries('tsl-2500-testing', 1, 'jpeg', m.seo_work_tsl_2500),
		carouselItem: image({
			workSlug: 'tsl-2500-testing',
			file: '1.jpeg',
			title: m.seo_work_tsl_2500,
			number: 1
		})
	}
];

export const getGalleryForPage = (kind: SeoPageKind, slug: string) =>
	workCatalog
		.filter((work) => work.relatedPages.some((page) => page.kind === kind && page.slug === slug))
		.flatMap((work) => work.gallery);

export const getBeforeAfterGalleryForPage = (kind: SeoPageKind, slug: string) =>
	workCatalog
		.filter((work) => work.relatedPages.some((page) => page.kind === kind && page.slug === slug))
		.flatMap((work) => work.beforeAfterGallery ?? []);

export const projectCarouselItems: ProjectCarouselItem[] = workCatalog.map((work) => {
	const relatedPage = work.relatedPages[0];
	if (!relatedPage) {
		throw new Error(`Work "${work.slug}" has no related SEO page`);
	}

	const item = work.carouselItem;
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
