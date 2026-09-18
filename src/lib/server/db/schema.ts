import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { readlink } from 'node:fs';

export const task = sqliteTable('task', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const tierlist_cards = sqliteTable('tierlist_cards', {
	name: text("name"),
	url: text("url"),
	series: text("series"),
	rank: text("rank"),
	explaination: text("explaination")
})

export *  from './auth.schema';
