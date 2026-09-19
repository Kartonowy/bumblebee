import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { tracker } from '$lib/server/db/schema';
import type {  Media } from '$lib';
import { addMedia, editMedia, removeMedia } from '$lib/server/media';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/dashboard/login');
	}
    const media = await db.select().from(tracker).orderBy(tracker.year);

    return { media }
};

export const actions: Actions = {
	addMedia: async ({ request }) => {
		const data = await request.formData();

		const type = data.get("mediatype") as string;

		if (!(["anime" , "books" , "games" , "manga" , "movies" , "series"].includes(type))) {
			return fail(422, "wrong type")
		}

		const media: Media = {
			name: data.get("medianame") as string,
			url: data.get("mediaurl") as string,
			type: type as "series" | "anime" | "books" | "games" | "manga" | "movies",
			year: new Date()
		};
		try {

			const something = await addMedia(media);
			return {
				...something
			}
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},

	editMedia: async ({ request }) => {
		const data = await request.formData();
		const identifier = data.get("identifier") as string;
		const [name, url] = identifier.split(";&:");

		const type = data.get("mediatype") as string;

		if (!(type in ["anime" , "books" , "games" , "manga" , "movies" , "series"])) {
				return fail(422, "wrong type")
		}

		const media: Media = {
			name: data.get("medianame") as string,
			url: data.get("mediaurl") as string,
			type: type as "series" | "anime" | "books" | "games" | "manga" | "movies",
			year: new Date()
		};
		try {

			const something = await editMedia(name, url, media);

			return {
				...something
			}
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},

	removeMedia: async ({ request }) => {
		const data = await request.formData();

		const media: Media = {
			name: data.get("medianame") as string,
			url: data.get("mediaurl") as string,
			type: data.get("mediarank") as "series" | "anime" | "books" | "games" | "manga" | "movies",
			year: new Date()
		};

		const confirm = data.get("identifier") as string;
		if (confirm !== "yes") {
			return fail(403, {
				message: "You didn't consent to removing this, try again."
			})
		}
		try {
			const something = await removeMedia(media);
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