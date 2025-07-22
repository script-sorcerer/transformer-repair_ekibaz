import {
	STORAGE_ACCESS_KEY_ID,
	STORAGE_ACCOUNT_ID,
	STORAGE_SECRET_ACCESS_KEY,
	TELEGRAM_BOT_TOKEN,
	TELEGRAM_CHAT_ID
} from '$env/static/private';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { nanoid } from 'nanoid';
import { TelegramClient } from '../client';

const S3 = new S3Client({
	region: 'auto',
	endpoint: `https://${STORAGE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: STORAGE_ACCESS_KEY_ID,
		secretAccessKey: STORAGE_SECRET_ACCESS_KEY
	}
});

export async function badRequest() {
	const telegramClient = new TelegramClient(TELEGRAM_BOT_TOKEN);

	await telegramClient.sendMessage({
		chatId: TELEGRAM_CHAT_ID,
		text: 'Отправьте данную команду как подпись к файлу с изображением, которую Вы хотите добавить как проект\\.\nКоманда: `/add_project` \\(изображение необходимо отправить как файл, без сжатия\\)',
		parseMode: 'MarkdownV2'
	});
}

export default async function (document: Telegram.Document) {
	console.log(JSON.stringify({ message: 'Adding file to Cloudflare R2', document }));

	const ext = document.file_name?.split('.').pop();
	if (!ext) {
		throw new Error('File extension not found');
	}

	const telegramClient = new TelegramClient(TELEGRAM_BOT_TOKEN);
	const telegramFile = await telegramClient.getFile({ file_id: document.file_id });
	const content = await telegramClient.downloadFile(telegramFile);

	try {
		const response = await S3.send(
			new PutObjectCommand({
				ACL: 'public-read',
				Body: content,
				Bucket: 'ekibaz-com',
				Key: `project-${nanoid()}.${ext}`,
				ContentLength: telegramFile.file_size,
				ContentType: document.mime_type
			})
		);

		console.debug(JSON.stringify({ message: 'File added to Cloudflare R2', response }));
	} catch (error) {
		console.error(error);
		throw error;
	}
}
