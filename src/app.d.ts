// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				TELEGRAM_BOT_TOKEN: string;
				TELEGRAM_CHAT_ID: string;
				STORAGE_ACCOUNT_ID: string;
				STORAGE_ACCESS_KEY_ID: string;
				STORAGE_SECRET_ACCESS_KEY: string;
			};
		}
	}

	namespace Telegram {
		interface Chat {
			id: number;
			type: 'private' | 'group' | 'supergroup' | 'channel';
			title?: string;
			username?: string;
			first_name?: string;
			last_name?: string;
			is_forum?: boolean;
		}

		interface MessageEntity {
			type:
				| 'mention'
				| 'hashtag'
				| 'cashtag'
				| 'bot_command'
				| 'url'
				| 'email'
				| 'phone_number'
				| 'bold'
				| 'italic'
				| 'underline'
				| 'strikethrough'
				| 'code'
				| 'pre'
				| 'text_link'
				| 'text_mention';
			offset: number;
			length: number;
			url?: string;
			user?: Chat;
			language?: string;
		}

		interface PhotoSize {
			file_id: string;
			file_unique_id: string;
			width: number;
			height: number;
			file_size?: number;
		}

		interface Document {
			file_id: string;
			file_unique_id: string;
			file_size?: number;
			file_name?: string;
			mime_type?: string;
			thumbnail?: PhotoSize;
		}

		interface File {
			file_id: string;
			file_unique_id: string;
			file_size?: number;
			file_path?: string;
		}

		interface Message {
			message_id: number;
			chat: Chat;
			date: number;
			text?: string;
			entities?: MessageEntity[];
			caption?: string;
			caption_entities?: MessageEntity[];
			document?: Document;
		}

		interface Update {
			update_id: number;
			message?: Message;
		}
	}
}

export {};
