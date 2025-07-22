import type { RequestHandler } from './$types';
import addProjectHandler, { badRequest } from '$lib/server/telegram/handlers/add-project.handler';
import { TELEGRAM_CHAT_ID } from '$env/static/private';

export const POST = (async ({ request }) => {
	const { message }: Telegram.Update = await request.json();

	if (message) {
		console.debug(JSON.stringify({ message }));

		const {
			text,
			entities,
			caption,
			caption_entities,
			document,
			chat: { id: chatId }
		} = message;
		if (chatId !== parseInt(TELEGRAM_CHAT_ID)) {
			return new Response(null, {
				status: 200
			});
		}

		if (!caption || !caption_entities || !document) {
			if (text && entities) {
				const botCommandEntity = entities.find((entity) => entity.type === 'bot_command');
				if (botCommandEntity) {
					const command = text
						.slice(botCommandEntity.offset + 1, botCommandEntity.offset + botCommandEntity.length)
						.split('@')[0];

					switch (command) {
						case 'add_project':
							badRequest().catch(console.error);
							break;
						default:
							break;
					}
				}
			}

			return new Response(null, {
				status: 200
			});
		}

		const botCommandEntity = caption_entities.find((entity) => entity.type === 'bot_command');
		if (botCommandEntity) {
			const command = caption
				.slice(botCommandEntity.offset + 1, botCommandEntity.offset + botCommandEntity.length)
				.split('@')[0];

			switch (command) {
				case 'add_project':
					await addProjectHandler(document);
					break;
				default:
					break;
			}
		}
	}

	return new Response(null, {
		status: 200
	});
}) satisfies RequestHandler;
