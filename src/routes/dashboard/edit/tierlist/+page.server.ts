import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { tierlist_cards } from '$lib/server/db/schema';import { addCard, editCard, removeCard } from '$lib/server/cards';
import type { Card } from '$lib';

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
	addCard: async ({ request }) => {
		const data = await request.formData();

		const card: Card = {
			name: data.get("cardname") as string,
			series: data.get("cardseries") as string,
			url: data.get("cardurl") as string,
			rank: data.get("cardrank") as string,
			explaination: data.get("cardexplaination") as string,
		};
		try {

			const something = await addCard(card);
			return {
				...something
			}
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},

	editCard: async ({ request }) => {
		const data = await request.formData();
		const identifier = data.get("identifier") as string;
		const [name, series] = identifier.split(";&:");

		const card: Card = {
			name: data.get("cardname") as string,
			series: data.get("cardseries") as string,
			url: data.get("cardurl") as string,
			rank: data.get("cardrank") as string,
			explaination: data.get("cardexplaination") as string,
		};
		try {

			const something = await editCard(name, series, card);
			return {
				...something
			}
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},
	removeCard: async ({ request }) => {
		const data = await request.formData();

		const card: Card = {
			name: data.get("cardname") as string,
			series: data.get("cardseries") as string,
			url: data.get("cardurl") as string,
			rank: data.get("cardrank") as string,
			explaination: data.get("cardexplaination") as string,
		};

		const confirm = data.get("identifier") as string;
		if (confirm !== "yes") {
			return fail(403, {
				message: "You didn't consent to removing this, try again."
			})
		}
		try {
			const something = await removeCard(card);
			return {
				...something
			}
		} catch (error: any) {
			return fail(422, {
				error: error!.message
			});
		}
	},
};