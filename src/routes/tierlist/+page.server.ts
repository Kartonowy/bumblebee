import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { tierlist_cards } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
    const cards = await db.select({
        name: tierlist_cards.name,
        url: tierlist_cards.url,
        rank: tierlist_cards.rank,
        series: tierlist_cards.series
    }).from(tierlist_cards);

    return { cards }
}