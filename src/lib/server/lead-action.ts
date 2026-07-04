import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '$env/static/private';
import { fail, type RequestEvent } from '@sveltejs/kit';
import { TelegramClient } from './telegram/client';

const MAX_PHOTO_SIZE = 10 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const text = (data: FormData, key: string) => String(data.get(key) ?? '').trim();
const escapeHtml = (value: string) =>
	value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export async function handleLeadAction({ request, url }: RequestEvent) {
	const data = await request.formData();
	const name = text(data, 'name').slice(0, 120);
	const contact = text(data, 'contact').slice(0, 180);
	const capacity = text(data, 'capacity').slice(0, 120);
	const voltage = text(data, 'voltage').slice(0, 120);
	const fault = text(data, 'fault').slice(0, 3000);
	const source = text(data, 'source').slice(0, 200);
	const website = text(data, 'website');
	const photo = data.get('photo');
	const values = { name, contact, capacity, voltage, fault };

	if (website) return { success: true };
	if (!name || !contact || !fault) {
		return fail(400, { ...values, invalidFields: true });
	}

	const hasPhoto = photo instanceof File && photo.size > 0;
	if (
		hasPhoto &&
		(!ALLOWED_PHOTO_TYPES.has(photo.type) || photo.size > MAX_PHOTO_SIZE)
	) {
		return fail(400, { ...values, invalidFile: true });
	}

	const telegram = new TelegramClient(TELEGRAM_BOT_TOKEN);
	const lines = [
		'<b>Новая заявка с сайта</b>',
		`Страница: <code>${escapeHtml(source || url.pathname)}</code>`,
		`Имя: <code>${escapeHtml(name)}</code>`,
		`Контакт: <code>${escapeHtml(contact)}</code>`,
		capacity ? `Мощность: <code>${escapeHtml(capacity)}</code>` : '',
		voltage ? `Напряжение: <code>${escapeHtml(voltage)}</code>` : '',
		`Неисправность: <blockquote expandable>${escapeHtml(fault)}</blockquote>`
	].filter(Boolean);

	try {
		await telegram.sendMessage({
			chatId: TELEGRAM_CHAT_ID,
			text: lines.join('\n'),
			parseMode: 'HTML'
		});

		if (hasPhoto) {
			await telegram.sendPhoto({
				chatId: TELEGRAM_CHAT_ID,
				photo,
				fileName: photo.name || 'nameplate.jpg',
				caption: 'Фото шильдика из заявки'
			});
		}
	} catch (error) {
		console.error(error);
		return fail(502, { ...values, success: false });
	}

	return { success: true };
}

export const leadActions = { default: handleLeadAction };
