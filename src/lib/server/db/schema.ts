import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
	id: int().primaryKey({ autoIncrement: true }),
	description: text().notNull(),
	storageFileKey: text('storage_file_key').notNull().unique(),
	createdAt: int('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: int('updated_at', { mode: 'timestamp_ms' }),
	deletedAt: int('deleted_at', { mode: 'timestamp_ms' })
});
