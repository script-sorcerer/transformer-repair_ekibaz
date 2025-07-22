import { Readable } from 'node:stream';
import type { ReadableStream } from 'node:stream/web';

export interface SendMessageOptions {
	chatId: number | string;
	text: string;
	parseMode?: 'MarkdownV2' | 'HTML';
}

export interface GetFileOptions {
	file_id: string;
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

	public async getFile(options: GetFileOptions) {
		console.debug(JSON.stringify({ message: 'Getting file', options }));

		const { file_id } = options;

		const url = `https://api.telegram.org/bot${this.token}/getFile`;
		const body = JSON.stringify({
			file_id
		});

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		});

		const data: TelegramResponse<Telegram.File> = await response.json();
		const { ok, result: file } = data;
		if (!ok) {
			console.debug(JSON.stringify({ message: 'Failed to get file', data }));
			throw new Error('Failed to get file');
		}

		return file;
	}

	public async downloadFile(file: Telegram.File) {
		console.debug(JSON.stringify({ message: 'Downloading file', file }));

		const url = `https://api.telegram.org/file/bot${this.token}/${file.file_path}`;

		const response = await fetch(url);
		if (response.body === null) {
			throw new Error('Response body is null');
		}

		return Readable.fromWeb(response.body as ReadableStream<unknown>);
	}
}
