import { m } from '$lib/paraglide/messages';

type Message = () => string;
type CarouselPageKind = 'repair' | 'services' | 'regions' | 'articles';

export interface ProjectCarouselItem {
	id: string;
	src: string;
	width: number;
	height: number;
	alt: Message;
	description: Message;
	href: string;
}

interface CarouselInput {
	id: string;
	file: string;
	title: Message;
	number: number;
	page: { kind: CarouselPageKind; slug: string };
	width?: number;
	height?: number;
}

const getCarouselPageHref = (page: CarouselInput['page']) => `/${page.kind}/${page.slug}`;

const item = ({
	id,
	file,
	title,
	number,
	page,
	width = 1200,
	height = 1600
}: CarouselInput): ProjectCarouselItem => ({
	id,
	src: `/media/works-thumbs/${id}/${file.replace(/\.[^.]+$/, '.jpg')}`,
	width,
	height,
	alt: () => m.seo_gallery_photo_alt({ number, work: title() }),
	description: title,
	href: getCarouselPageHref(page)
});

export const projectCarouselItems: ProjectCarouselItem[] = [
	item({
		id: 'transformer-315-kva-repair',
		file: '8.webp',
		title: m.seo_work_315,
		number: 8,
		page: { kind: 'repair', slug: 'power-transformers' }
	}),
	item({
		id: 'tmg-63-voltage-conversion',
		file: '1.webp',
		title: m.seo_work_tmg_63,
		number: 1,
		page: { kind: 'repair', slug: 'tm-tmz-tmg-transformers' }
	}),
	item({
		id: 'transformer-63-ktp',
		file: '1.webp',
		title: m.seo_work_ktp_63,
		number: 1,
		page: { kind: 'repair', slug: 'ktp' },
		width: 478,
		height: 850
	}),
	item({
		id: 'transformer-630-hv-winding',
		file: '4.webp',
		title: m.seo_work_winding_630,
		number: 4,
		page: { kind: 'repair', slug: 'transformer-winding' }
	}),
	item({
		id: 'transformer-1000-repair',
		file: '1.webp',
		title: m.seo_work_1000,
		number: 1,
		page: { kind: 'repair', slug: 'power-transformers' }
	}),
	item({
		id: 'tfzm-220-repair',
		file: '1.jpeg',
		title: m.seo_work_tfzm_220,
		number: 1,
		page: { kind: 'repair', slug: 'oil-transformers' }
	}),
	item({
		id: 'dry-transformer-400-modernization',
		file: '1.jpeg',
		title: m.seo_work_dry_400,
		number: 1,
		page: { kind: 'repair', slug: 'dry-transformers' }
	}),
	item({
		id: 'transformer-1600-removal',
		file: '1.webp',
		title: m.seo_work_removal_1600,
		number: 1,
		page: { kind: 'services', slug: 'installation' },
		width: 1086,
		height: 1448
	}),
	item({
		id: 'tmf-1600-maintenance',
		file: '1.jpeg',
		title: m.seo_work_tmf_1600,
		number: 1,
		page: { kind: 'repair', slug: 'oil-transformers' }
	}),
	item({
		id: 'trdns-25000-inspection',
		file: '1.webp',
		title: m.seo_work_trdns_25000,
		number: 1,
		page: { kind: 'repair', slug: 'power-transformers' },
		width: 1086,
		height: 1448
	}),
	item({
		id: 'tsl-2500-testing',
		file: '1.jpeg',
		title: m.seo_work_tsl_2500,
		number: 1,
		page: { kind: 'repair', slug: 'dry-transformers' }
	})
];
