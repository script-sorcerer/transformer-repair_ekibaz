import { m } from '$lib/paraglide/messages';
import { SITE_URL } from './locales';

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const getBusinessSchema = () => ({
	'@type': 'LocalBusiness',
	'@id': BUSINESS_ID,
	name: m.shy_still_finch_dare(),
	legalName: m.shy_still_finch_dare(),
	url: SITE_URL,
	image: `${SITE_URL}/android-chrome-512x512.png`,
	logo: `${SITE_URL}/android-chrome-512x512.png`,
	description: m.patient_zesty_pug_nourish(),
	telephone: ['+7-747-181-8112', '+7-775-167-0032'],
	email: 'ekibaztransformator@gmail.com',
	address: {
		'@type': 'PostalAddress',
		streetAddress: m.suave_next_lamb_cuddle(),
		addressLocality: m.big_low_cougar_sail(),
		addressCountry: 'KZ'
	},
	geo: {
		'@type': 'GeoCoordinates',
		latitude: 51.726338,
		longitude: 75.342822
	},
	areaServed: [
		{ '@type': 'Country', name: 'Kazakhstan' },
		{ '@type': 'City', name: 'Ekibastuz' },
		{ '@type': 'City', name: 'Pavlodar' },
		{ '@type': 'City', name: 'Astana' },
		{ '@type': 'City', name: 'Karaganda' },
		{ '@type': 'City', name: 'Almaty' }
	],
	knowsLanguage: ['ru', 'kk', 'en'],
	sameAs: ['https://www.instagram.com/remonttransformatorov/']
});

export const getWebsiteSchema = (description: string) => ({
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	url: SITE_URL,
	name: m.sad_glad_parakeet_trip(),
	description,
	publisher: { '@id': BUSINESS_ID }
});
