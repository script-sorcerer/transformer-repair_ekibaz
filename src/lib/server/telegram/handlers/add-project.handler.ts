import {
	STORAGE_ACCESS_KEY_ID,
	CLOUDFLARE_ACCOUNT_ID,
	STORAGE_SECRET_ACCESS_KEY,
	TELEGRAM_BOT_TOKEN,
	TELEGRAM_CHAT_ID
} from '$env/static/private';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { nanoid } from 'nanoid';
import { TelegramClient } from '../client';
import { drizzle } from 'drizzle-orm/d1';
import { projects } from '$lib/server/db/schema';

const S3 = new S3Client({
	region: 'auto',
	endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: STORAGE_ACCESS_KEY_ID,
		secretAccessKey: STORAGE_SECRET_ACCESS_KEY
	}
});

export async function badRequest() {
	const telegramClient = new TelegramClient(TELEGRAM_BOT_TOKEN);

	await telegramClient.sendMessage({
		chatId: TELEGRAM_CHAT_ID,
		text: 'Отправьте данную команду как подпись к файлу с изображением и описанием, которую Вы хотите добавить как проект\\.\nКоманда: `/add_project` \\(изображение необходимо отправить как файл, без сжатия\\)',
		parseMode: 'MarkdownV2'
	});
}

export default async function (
	document: Telegram.Document,
	description: string,
	platform: Readonly<App.Platform>
) {
	console.log(JSON.stringify({ message: 'Adding project', document, description }));

	const ext = document.file_name?.split('.').pop();
	if (!ext) {
		throw new Error('File extension not found');
	}

	const db = drizzle(platform.env.DB);

	const telegramClient = new TelegramClient(TELEGRAM_BOT_TOKEN);
	const telegramFile = await telegramClient.getFile({ file_id: document.file_id });
	const content = await telegramClient.downloadFile(telegramFile);

	const projectId = nanoid();
	const storageFileKey = `project-${projectId}.${ext}`;

	try {
		const storedFile = await S3.send(
			new PutObjectCommand({
				ACL: 'public-read',
				Body: Buffer.from(content),
				Bucket: 'ekibaz-com',
				Key: storageFileKey,
				ContentLength: telegramFile.file_size,
				ContentType: document.mime_type
			})
		);

		console.debug(JSON.stringify({ message: 'File added to Cloudflare R2', storedFile }));
	} catch (error) {
		console.error(error);
		throw error;
	}

	try {
		await db.insert(projects).values({
			description,
			storageFileKey
		});
	} catch (error) {
		console.error(error);

		await S3.send(new DeleteObjectCommand({ Bucket: 'ekibaz-com', Key: storageFileKey }));

		throw error;
	}
}
