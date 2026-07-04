export interface SendMessageOptions {
	chatId: number | string;
	text: string;
	parseMode?: 'MarkdownV2' | 'HTML';
}

export interface SendPhotoOptions {
	chatId: number | string;
	photo: Blob;
	fileName: string;
	caption?: string;
}

interface TelegramResponse<TData> {
	ok: boolean;
	result: TData;
}

export class TelegramClient {
	private readonly token: string;

	constructor(token: string) {
		this.token = token;
	}

	public async sendMessage(options: SendMessageOptions) {
		console.debug(JSON.stringify({ message: 'Sending message to the chat', options }));

		const { chatId, text, parseMode } = options;

		const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
		const body = JSON.stringify({
			chat_id: chatId,
			text: text,
			parse_mode: parseMode
		});

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		});

		const data: TelegramResponse<unknown> = await response.json();
		const { ok, result } = data;
		if (!ok) {
			console.debug(JSON.stringify({ message: 'Failed to send message', data }));
			throw new Error('Failed to send message');
		}

		return result;
	}

	public async sendPhoto(options: SendPhotoOptions) {
		const { chatId, photo, fileName, caption } = options;
		const body = new FormData();
		body.set('chat_id', String(chatId));
		body.set('photo', photo, fileName);
		if (caption) body.set('caption', caption);

		const response = await fetch(`https://api.telegram.org/bot${this.token}/sendPhoto`, {
			method: 'POST',
			body
		});
		const data: TelegramResponse<unknown> = await response.json();
		if (!data.ok) {
			console.debug(JSON.stringify({ message: 'Failed to send photo', data }));
			throw new Error('Failed to send photo');
		}

		return data.result;
	}
}
