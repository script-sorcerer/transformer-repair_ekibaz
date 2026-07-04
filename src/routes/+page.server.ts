import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { TelegramClient } from '$lib/server/telegram/client';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '$env/static/private';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const email = data.get('email') as string;
		const message = data.get('message') as string;

		if (!name) {
			return fail(400, { name, email, message, missingName: true });
		}
		if (!email) {
			return fail(400, { name, email, message, missingEmail: true });
		}
		if (!message) {
			return fail(400, { name, email, message, missingMessage: true });
		}

		const tagsToReplace = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;'
		} as Record<string, string>;
		const clearMessage = message.trim().replaceAll(/[&<>]/g, (tag) => tagsToReplace[tag] ?? tag);
		if (clearMessage.length === 0) {
			return fail(400, { name, email, message, emptyMessage: true });
		}
		if (clearMessage.length > 4096) {
			return fail(400, { name, email, message, tooLongMessage: true });
		}

		const telegramClient = new TelegramClient(TELEGRAM_BOT_TOKEN);

		try {
			await telegramClient.sendMessage({
				chatId: TELEGRAM_CHAT_ID,
				text: `Имя: <code>${name}</code>\nEmail: <code>${email}</code>\nСообщение: <blockquote expandable>${clearMessage}</blockquote>`,
				parseMode: 'HTML'
			});
		} catch (err) {
			console.error(err);

			return { success: false };
		}

		return { success: true };
	}
} satisfies Actions;
