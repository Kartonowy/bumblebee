import type { Card } from "$lib";
import { and, eq, sql } from "drizzle-orm";
import { db } from "./db";
import { tierlist_cards } from "./db/schema";
import { fail } from "@sveltejs/kit";

export const addCard = async (card: Card) => {
    const exists = await db.select().from(tierlist_cards)
        .where(sql`${card.name} = tierlist_cards.name AND ${card.series} = tierlist_cards.series;`);

    if (exists.length > 0) {
        throw new Error("This item was already found.");
    }

    const result = await db.insert(tierlist_cards).values({
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

export const editCard = async (name: string, series: string, card: Card) => {
    const exists = await db.select().from(tierlist_cards)
        .where(sql`${name} = tierlist_cards.name AND ${series} = tierlist_cards.series;`);

    if (exists.length < 1) {
        throw new Error("This item was not found.");
    }

    if (exists.length > 1) {
        throw new Error("More than one item found.");
    }

    const result = await db.update(tierlist_cards).set({
        name: card.name,
        url: card.url,
        series: card.series,
        rank: card.rank,
        explaination: card.explaination 
    }).where(and(eq(tierlist_cards.name, name), eq(tierlist_cards.series, series)));

    return {
        message: `${card.name} edited!`
    }
}

export const removeCard = async (card: Card) => {
    const exists = await db.select().from(tierlist_cards)
        .where(sql`${card.name} = tierlist_cards.name AND ${card.series} = tierlist_cards.series;`);

    if (exists.length < 1) {
        throw new Error("This item was not found.");
    }

    if (exists.length > 1) {
        throw new Error("More than one item found.");
    }

    const result = await db.delete(tierlist_cards)
    .where(and(eq(tierlist_cards.name, card.name!), eq(tierlist_cards.series, card.series!)))
    .returning({ deletedName: tierlist_cards.name });

    return {
        message: `${result[0].deletedName} removed!`
    }
}