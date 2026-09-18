import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/dashboard/login');
	}
    const cards = await db .select({
        name: tierlist_cards.name,
        url: tierlist_cards.url,
        rank: tierlist_cards.rank,
        series: tierlist_cards.series,
		explaination: tierlist_cards.explaination
    }).from(tierlist_cards)
    .groupBy(tierlist_cards.series, tierlist_cards.name);

    return { cards }
};

export const actions: Actions = {
	signOut: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
		return redirect(302, '/');
	}
};
import { db } from '$lib/server/db';
import { tierlist_cards } from '$lib/server/db/schema';
