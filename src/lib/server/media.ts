import type { Media } from "$lib";
import { sql } from "drizzle-orm";
import { db } from "./db";
import { tracker } from "./db/schema";

export const addMedia = async (media: Media) => {
    const exists = await db.select().from(tracker)
        .where(sql`${media.name} = tracker.name AND ${media.url} = tracker.url`);

    if (exists.length > 0) {
        throw new Error("This item was already found.");
    }

    await db.insert(tracker).values({
        name: media.name,
        url: media.url,
        type: media.type,
        year: media.year 
    });

    return {
        message: `${media.name} added!`
    }
}

export const editMedia = async (id: number,  media: Media) => {
    const exists = await db.select().from(tracker).where(sql`${id} = rowid`)

    if (exists.length < 1) {
        throw new Error("This item was not found.");
    }

    if (exists.length > 1) {
        throw new Error("More than one item found.");
    }

    await db.update(tracker).set({
        name: media.name,
        url: media.url,
        type: media.type,
        year: media.year 
    }).where(sql`${id} = rowid`)

    return {
        message: `${media.name} edited!`
    }
}

export const removeMedia = async (id: number) => {
    const exists = await db.select().from(tracker)
        .where(sql`${id} = rowid`);

    if (exists.length < 1) {
        throw new Error("This item was not found.");
    }

    if (exists.length > 1) {
        throw new Error("More than one item found.");
    }

    const result = await db.delete(tracker)
        .where(sql`${id} = rowid`)
        .returning({ deletedName: tracker.name });

    return {
        message: `${result[0].deletedName} removed!`
    }
}