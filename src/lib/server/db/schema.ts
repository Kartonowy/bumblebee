import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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

export const tracker = sqliteTable('tracker', {
	type: text({ enum: ["anime", "books", "games", "manga", "movies", "series"] }).notNull(),
	name: text("name").notNull(),
	url: text("url").notNull(),
	year: integer({ mode: 'timestamp' }).notNull()
});

export *  from './auth.schema';
