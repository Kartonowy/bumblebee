import type { Card } from "$lib";
import { sql } from "drizzle-orm";
import { db } from "./db";
import { tierlist_cards } from "./db/schema";

export const addCard = async (card: Card) => {
    const exists = await db.select().from(tierlist_cards)
        .where(sql`${card.name} = tierlist_cards.name AND ${card.series} = tierlist_cards.series;`);

    if (exists.length > 0) {
        throw new Error("This item was already found.");
    }

    await db.insert(tierlist_cards).values({
        name: card.name,
        url: card.url,
        series: card.series,
        rank: card.rank,
        explaination: card.explaination 
    });
    return {
        message: `${card.name} added!`
    }
}

export const editCard = async (id: number, card: Card) => {
    const exists = await db.select().from(tierlist_cards)
        .where(sql`rowid = ${card.rowid ?? id}`);

    if (exists.length < 1) {
        throw new Error("This item was not found.");
    }

    if (exists.length > 1) {
        throw new Error("More than one item found.");
    }

    await db.update(tierlist_cards).set({
        name: card.name,
        url: card.url,
        series: card.series,
        rank: card.rank,
        explaination: card.explaination 
    }).where(sql`rowid = ${id}`);

    return {
        message: `${card.name} edited!`
    }
}

export const removeCard = async (id: number) => {
    const exists = await db.select().from(tierlist_cards)
        .where(sql`rowid = ${id}`);

    if (exists.length < 1) {
        throw new Error("This item was not found.");
    }

    if (exists.length > 1) {
        throw new Error("More than one item found.");
    }

    const result = await db.delete(tierlist_cards)
        .where(sql`rowid = ${id}`)
        .returning({ deletedName: tierlist_cards.name });

    return {
        message: `${result[0].deletedName} removed!`
    }
}