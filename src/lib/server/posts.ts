import type { Post } from "$lib";
import { eq, sql } from "drizzle-orm";
import { db } from "./db";
import { posts } from "./db/schema";

export const addPost = async (post: Post) => {
    const exists = await db.select().from(posts)
        .where(sql`${post.title} = posts.title AND ${post.language} = posts.language`);

    if (exists.length > 0) {
        throw new Error(`Post with this title in ${post.language} language was already found.`);
    }

    await db.insert(posts).values({
        title: post.title,
        content: post.content,
        language: post.language,
        tags: post.tags,
        published: post.published,
        publishedAt: post.published ? sql`(CURRENT_TIMESTAMP)` : null
    });

    return {
        message: `"${post.title}" added!`
    }
}

export const editPost = async (id: number,  post: Post) => {
    const exists = await db.select().from(posts)
        .where(sql`${id} = posts.rowid;`);

    if (exists.length < 1) {
        throw new Error("This item was not found.");
    }

    if (exists.length > 1) {
        throw new Error("More than one item found.");
    }

    await db.update(posts).set({
        title: post.title,
        content: post.content,
        language: post.language,
        tags: post.tags,
        published: post.published,
        publishedAt: post.published ? sql`(CURRENT_TIMESTAMP)` : null
    }).where(eq(sql`posts.rowid`, id));

    return {
        message: `"${post.title}" edited!`
    }
}

export const removePost = async (id: number) => {
    const exists = await db.select().from(posts)
        .where(sql`posts.rowid = ${id}`);

    if (exists.length < 1) {
        throw new Error("This item was not found.");
    }

    if (exists.length > 1) {
        throw new Error("More than one item found.");
    }

    const result = await db.delete(posts)
    .where(sql`posts.rowid = ${id}`)
    .returning({ deletedName: posts.title });

    return {
        message: `${result[0].deletedName} removed!`
    }
}