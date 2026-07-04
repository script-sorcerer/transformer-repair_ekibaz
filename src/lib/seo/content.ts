import { m } from '$lib/paraglide/messages';

export type SeoPageKind = 'repair' | 'services' | 'regions' | 'articles';
type Message = () => string;

export interface SeoSection {
	heading: Message;
	paragraphs?: Message[];
	items?: Message[];
}

export type GalleryItem =
	| {
			src: string;
			type: 'image';
			width: number;
			height: number;
			alt: Message;
			caption: Message;
	  }
	| {
			src: string;
			type: 'video';
			width: number;
			height: number;
			poster: string;
			hasAudio: false;
			alt: Message;
			caption: Message;
	  };

export interface SeoPageDefinition {
	slug: string;
	kind: SeoPageKind;
	title: Message;
	metaTitle: Message;
	metaDescription: Message;
	lead: Message;
	sections: SeoSection[];
	related: Array<{ kind: SeoPageKind; slug: string }>;
	gallery: GalleryItem[];
}

interface CommercialInput {
	slug: string;
	kind: Exclude<SeoPageKind, 'articles'>;
	title: Message;
	metaTitle: Message;
	metaDescription: Message;
	lead: Message;
	equipment: Message;
	faults: Message;
	logistics?: Message;
	related: SeoPageDefinition['related'];
}

const commercial = (input: CommercialInput): SeoPageDefinition => ({
	...input,
	sections: [
		{
			heading: m.seo_section_equipment,
			paragraphs: [input.equipment],
			items: [
				m.seo_fact_capacity,
				m.seo_fact_input_voltage,
				m.seo_fact_output_voltage,
				m.seo_fact_repair_types
			]
		},
		{ heading: m.seo_section_faults, paragraphs: [input.faults] },
		{
			heading: m.seo_section_process,
			items: [
				m.seo_process_request,
				m.seo_process_diagnostics,
				m.seo_process_agreement,
				m.seo_process_repair,
				m.seo_process_testing
			]
		},
		{
			heading: m.seo_section_timing,
			paragraphs: [m.seo_timing_text]
		},
		{
			heading: m.seo_section_logistics,
			paragraphs: [input.logistics ?? m.seo_logistics_workshop]
		},
		{
			heading: m.seo_section_documents,
			paragraphs: [m.seo_documents_text]
		},
		{
			heading: m.seo_section_warranty,
			paragraphs: [m.seo_warranty_text]
		}
	],
	gallery: []
});

interface ArticleInput {
	slug: string;
	title: Message;
	metaTitle: Message;
	metaDescription: Message;
	lead: Message;
	body: Message[];
	points: Message[];
	related: SeoPageDefinition['related'];
}

const article = (input: ArticleInput): SeoPageDefinition => ({
	...input,
	kind: 'articles',
	sections: [
		{ heading: m.seo_article_main_heading, paragraphs: input.body },
		{ heading: m.seo_article_checklist_heading, items: input.points },
		{
			heading: m.seo_section_next_step,
			paragraphs: [m.seo_article_next_step]
		}
	],
	gallery: []
});

export const seoPages: SeoPageDefinition[] = [
	commercial({
		slug: 'power-transformers',
		kind: 'repair',
		title: m.seo_power_title,
		metaTitle: m.seo_power_meta_title,
		metaDescription: m.seo_power_meta_description,
		lead: m.seo_power_lead,
		equipment: m.seo_power_equipment,
		faults: m.seo_power_faults,
		related: [
			{ kind: 'repair', slug: 'oil-transformers' },
			{ kind: 'repair', slug: 'dry-transformers' },
			{ kind: 'services', slug: 'diagnostics' }
		]
	}),
	commercial({
		slug: 'oil-transformers',
		kind: 'repair',
		title: m.seo_oil_title,
		metaTitle: m.seo_oil_meta_title,
		metaDescription: m.seo_oil_meta_description,
		lead: m.seo_oil_lead,
		equipment: m.seo_oil_equipment,
		faults: m.seo_oil_faults,
		related: [
			{ kind: 'repair', slug: 'tm-tmz-tmg-transformers' },
			{ kind: 'services', slug: 'diagnostics' },
			{ kind: 'services', slug: 'testing' }
		]
	}),
	commercial({
		slug: 'dry-transformers',
		kind: 'repair',
		title: m.seo_dry_title,
		metaTitle: m.seo_dry_meta_title,
		metaDescription: m.seo_dry_meta_description,
		lead: m.seo_dry_lead,
		equipment: m.seo_dry_equipment,
		faults: m.seo_dry_faults,
		related: [
			{ kind: 'repair', slug: 'power-transformers' },
			{ kind: 'repair', slug: 'transformer-winding' },
			{ kind: 'services', slug: 'testing' }
		]
	}),
	commercial({
		slug: 'tm-tmz-tmg-transformers',
		kind: 'repair',
		title: m.seo_tm_title,
		metaTitle: m.seo_tm_meta_title,
		metaDescription: m.seo_tm_meta_description,
		lead: m.seo_tm_lead,
		equipment: m.seo_tm_equipment,
		faults: m.seo_tm_faults,
		related: [
			{ kind: 'repair', slug: 'oil-transformers' },
			{ kind: 'repair', slug: 'transformer-winding' },
			{ kind: 'articles', slug: 'tm-tmz-tmg-transformer-faults' }
		]
	}),
	commercial({
		slug: 'ktp',
		kind: 'repair',
		title: m.seo_ktp_title,
		metaTitle: m.seo_ktp_meta_title,
		metaDescription: m.seo_ktp_meta_description,
		lead: m.seo_ktp_lead,
		equipment: m.seo_ktp_equipment,
		faults: m.seo_ktp_faults,
		related: [
			{ kind: 'services', slug: 'installation' },
			{ kind: 'services', slug: 'testing' },
			{ kind: 'articles', slug: 'ktp-10-04-repair' }
		]
	}),
	commercial({
		slug: 'transformer-winding',
		kind: 'repair',
		title: m.seo_winding_title,
		metaTitle: m.seo_winding_meta_title,
		metaDescription: m.seo_winding_meta_description,
		lead: m.seo_winding_lead,
		equipment: m.seo_winding_equipment,
		faults: m.seo_winding_faults,
		related: [
			{ kind: 'repair', slug: 'power-transformers' },
			{ kind: 'services', slug: 'diagnostics' },
			{ kind: 'articles', slug: 'transformer-repair-with-or-without-rewinding' }
		]
	}),
	commercial({
		slug: 'diagnostics',
		kind: 'services',
		title: m.seo_diagnostics_title,
		metaTitle: m.seo_diagnostics_meta_title,
		metaDescription: m.seo_diagnostics_meta_description,
		lead: m.seo_diagnostics_lead,
		equipment: m.seo_diagnostics_equipment,
		faults: m.seo_diagnostics_faults,
		related: [
			{ kind: 'repair', slug: 'power-transformers' },
			{ kind: 'services', slug: 'testing' },
			{ kind: 'articles', slug: 'transformer-diagnostics-active-part' }
		]
	}),
	commercial({
		slug: 'testing',
		kind: 'services',
		title: m.seo_testing_title,
		metaTitle: m.seo_testing_meta_title,
		metaDescription: m.seo_testing_meta_description,
		lead: m.seo_testing_lead,
		equipment: m.seo_testing_equipment,
		faults: m.seo_testing_faults,
		related: [
			{ kind: 'services', slug: 'diagnostics' },
			{ kind: 'repair', slug: 'ktp' },
			{ kind: 'articles', slug: 'transformer-testing-after-repair' }
		]
	}),
	commercial({
		slug: 'installation',
		kind: 'services',
		title: m.seo_installation_title,
		metaTitle: m.seo_installation_meta_title,
		metaDescription: m.seo_installation_meta_description,
		lead: m.seo_installation_lead,
		equipment: m.seo_installation_equipment,
		faults: m.seo_installation_faults,
		related: [
			{ kind: 'repair', slug: 'power-transformers' },
			{ kind: 'repair', slug: 'ktp' },
			{ kind: 'services', slug: 'testing' }
		]
	}),
	commercial({
		slug: 'emergency-transformer-repair',
		kind: 'services',
		title: m.seo_emergency_title,
		metaTitle: m.seo_emergency_meta_title,
		metaDescription: m.seo_emergency_meta_description,
		lead: m.seo_emergency_lead,
		equipment: m.seo_emergency_equipment,
		faults: m.seo_emergency_faults,
		related: [
			{ kind: 'services', slug: 'diagnostics' },
			{ kind: 'repair', slug: 'transformer-winding' },
			{ kind: 'articles', slug: 'emergency-transformer-repair-first-hours' }
		]
	}),
	commercial({
		slug: 'pavlodar',
		kind: 'regions',
		title: m.seo_pavlodar_title,
		metaTitle: m.seo_pavlodar_meta_title,
		metaDescription: m.seo_pavlodar_meta_description,
		lead: m.seo_pavlodar_lead,
		equipment: m.seo_region_equipment,
		faults: m.seo_region_faults,
		logistics: m.seo_pavlodar_logistics,
		related: [
			{ kind: 'regions', slug: 'ekibastuz' },
			{ kind: 'repair', slug: 'power-transformers' },
			{ kind: 'services', slug: 'installation' }
		]
	}),
	commercial({
		slug: 'ekibastuz',
		kind: 'regions',
		title: m.seo_ekibastuz_title,
		metaTitle: m.seo_ekibastuz_meta_title,
		metaDescription: m.seo_ekibastuz_meta_description,
		lead: m.seo_ekibastuz_lead,
		equipment: m.seo_region_equipment,
		faults: m.seo_region_faults,
		logistics: m.seo_ekibastuz_logistics,
		related: [
			{ kind: 'regions', slug: 'pavlodar' },
			{ kind: 'repair', slug: 'power-transformers' },
			{ kind: 'services', slug: 'diagnostics' }
		]
	}),
	commercial({
		slug: 'astana',
		kind: 'regions',
		title: m.seo_astana_title,
		metaTitle: m.seo_astana_meta_title,
		metaDescription: m.seo_astana_meta_description,
		lead: m.seo_astana_lead,
		equipment: m.seo_region_equipment,
		faults: m.seo_region_faults,
		logistics: m.seo_remote_region_logistics,
		related: [
			{ kind: 'repair', slug: 'power-transformers' },
			{ kind: 'services', slug: 'diagnostics' },
			{ kind: 'services', slug: 'installation' }
		]
	}),
	commercial({
		slug: 'karaganda',
		kind: 'regions',
		title: m.seo_karaganda_title,
		metaTitle: m.seo_karaganda_meta_title,
		metaDescription: m.seo_karaganda_meta_description,
		lead: m.seo_karaganda_lead,
		equipment: m.seo_region_equipment,
		faults: m.seo_region_faults,
		logistics: m.seo_remote_region_logistics,
		related: [
			{ kind: 'repair', slug: 'power-transformers' },
			{ kind: 'repair', slug: 'oil-transformers' },
			{ kind: 'services', slug: 'testing' }
		]
	}),
	commercial({
		slug: 'almaty',
		kind: 'regions',
		title: m.seo_almaty_title,
		metaTitle: m.seo_almaty_meta_title,
		metaDescription: m.seo_almaty_meta_description,
		lead: m.seo_almaty_lead,
		equipment: m.seo_region_equipment,
		faults: m.seo_region_faults,
		logistics: m.seo_remote_region_logistics,
		related: [
			{ kind: 'repair', slug: 'power-transformers' },
			{ kind: 'repair', slug: 'dry-transformers' },
			{ kind: 'services', slug: 'diagnostics' }
		]
	}),
	article({
		slug: 'capital-transformer-repair-signs',
		title: m.seo_article_capital_title,
		metaTitle: m.seo_article_capital_meta_title,
		metaDescription: m.seo_article_capital_meta_description,
		lead: m.seo_article_capital_lead,
		body: [m.seo_article_capital_body_1, m.seo_article_capital_body_2],
		points: [
			m.seo_article_capital_point_1,
			m.seo_article_capital_point_2,
			m.seo_article_capital_point_3
		],
		related: [
			{ kind: 'repair', slug: 'power-transformers' },
			{ kind: 'services', slug: 'diagnostics' }
		]
	}),
	article({
		slug: 'transformer-repair-with-or-without-rewinding',
		title: m.seo_article_rewinding_title,
		metaTitle: m.seo_article_rewinding_meta_title,
		metaDescription: m.seo_article_rewinding_meta_description,
		lead: m.seo_article_rewinding_lead,
		body: [m.seo_article_rewinding_body_1, m.seo_article_rewinding_body_2],
		points: [
			m.seo_article_rewinding_point_1,
			m.seo_article_rewinding_point_2,
			m.seo_article_rewinding_point_3
		],
		related: [
			{ kind: 'repair', slug: 'transformer-winding' },
			{ kind: 'services', slug: 'diagnostics' }
		]
	}),
	article({
		slug: 'transformer-testing-after-repair',
		title: m.seo_article_testing_title,
		metaTitle: m.seo_article_testing_meta_title,
		metaDescription: m.seo_article_testing_meta_description,
		lead: m.seo_article_testing_lead,
		body: [m.seo_article_testing_body_1, m.seo_article_testing_body_2],
		points: [
			m.seo_article_testing_point_1,
			m.seo_article_testing_point_2,
			m.seo_article_testing_point_3
		],
		related: [
			{ kind: 'services', slug: 'testing' },
			{ kind: 'repair', slug: 'power-transformers' }
		]
	}),
	article({
		slug: 'tm-tmz-tmg-transformer-faults',
		title: m.seo_article_tm_title,
		metaTitle: m.seo_article_tm_meta_title,
		metaDescription: m.seo_article_tm_meta_description,
		lead: m.seo_article_tm_lead,
		body: [m.seo_article_tm_body_1, m.seo_article_tm_body_2],
		points: [
			m.seo_article_tm_point_1,
			m.seo_article_tm_point_2,
			m.seo_article_tm_point_3
		],
		related: [
			{ kind: 'repair', slug: 'tm-tmz-tmg-transformers' },
			{ kind: 'repair', slug: 'oil-transformers' }
		]
	}),
	article({
		slug: 'ktp-10-04-repair',
		title: m.seo_article_ktp_title,
		metaTitle: m.seo_article_ktp_meta_title,
		metaDescription: m.seo_article_ktp_meta_description,
		lead: m.seo_article_ktp_lead,
		body: [m.seo_article_ktp_body_1, m.seo_article_ktp_body_2],
		points: [
			m.seo_article_ktp_point_1,
			m.seo_article_ktp_point_2,
			m.seo_article_ktp_point_3
		],
		related: [
			{ kind: 'repair', slug: 'ktp' },
			{ kind: 'services', slug: 'testing' }
		]
	}),
	article({
		slug: 'emergency-transformer-repair-first-hours',
		title: m.seo_article_emergency_title,
		metaTitle: m.seo_article_emergency_meta_title,
		metaDescription: m.seo_article_emergency_meta_description,
		lead: m.seo_article_emergency_lead,
		body: [m.seo_article_emergency_body_1, m.seo_article_emergency_body_2],
		points: [
			m.seo_article_emergency_point_1,
			m.seo_article_emergency_point_2,
			m.seo_article_emergency_point_3
		],
		related: [
			{ kind: 'services', slug: 'emergency-transformer-repair' },
			{ kind: 'services', slug: 'diagnostics' }
		]
	}),
	article({
		slug: 'transformer-diagnostics-active-part',
		title: m.seo_article_diagnostics_title,
		metaTitle: m.seo_article_diagnostics_meta_title,
		metaDescription: m.seo_article_diagnostics_meta_description,
		lead: m.seo_article_diagnostics_lead,
		body: [m.seo_article_diagnostics_body_1, m.seo_article_diagnostics_body_2],
		points: [
			m.seo_article_diagnostics_point_1,
			m.seo_article_diagnostics_point_2,
			m.seo_article_diagnostics_point_3
		],
		related: [
			{ kind: 'services', slug: 'diagnostics' },
			{ kind: 'repair', slug: 'power-transformers' }
		]
	})
];

export const sectionMessages: Record<
	SeoPageKind,
	{ title: Message; metaTitle: Message; description: Message }
> = {
	repair: {
		title: m.seo_index_repair_title,
		metaTitle: m.seo_index_repair_meta_title,
		description: m.seo_index_repair_description
	},
	services: {
		title: m.seo_index_services_title,
		metaTitle: m.seo_index_services_meta_title,
		description: m.seo_index_services_description
	},
	regions: {
		title: m.seo_index_regions_title,
		metaTitle: m.seo_index_regions_meta_title,
		description: m.seo_index_regions_description
	},
	articles: {
		title: m.seo_index_articles_title,
		metaTitle: m.seo_index_articles_meta_title,
		description: m.seo_index_articles_description
	}
};

export const getSeoPage = (kind: SeoPageKind, slug: string) =>
	seoPages.find((page) => page.kind === kind && page.slug === slug);

export const getSectionPages = (kind: SeoPageKind) =>
	seoPages.filter((page) => page.kind === kind);

export const getPageHref = (page: Pick<SeoPageDefinition, 'kind' | 'slug'>) =>
	`/${page.kind}/${page.slug}`;
