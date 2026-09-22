import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import type {  Post } from '$lib';
import { addPost, editPost, removePost } from '$lib/server/posts';
import { getTableColumns, sql } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/dashboard/login');
	}
    const postList = await db.select({ 
        rowid: sql`rowid`,
        ...getTableColumns(posts)
    }).from(posts);

    return { postList }
};

export const actions: Actions = {
	addPost: async ({ request }) => {
		const data = await request.formData();

		const lang = data.get("postlang") as string;
		console.log(data)

		if (!(["en", "pl", "jp"].includes(lang))) {
			return fail(422, "wrong language")
		}

        // TODO: CONVERT MARKDOWN INTO HTML

		const post: Post = {
			title: data.get("posttitle") as string,
			content: data.get("postcontent") as string,
			language: lang as "en" | "pl" | "jp",
            tags: (data.get("posttags") as string).split(",").map((e) => e.trim()),
			published: data.get("postpublished") as string === 'on'
		};

		try {
			const something = await addPost(post);
			return {
				...something
			}
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},

	editPost: async ({ request }) => {
		const data = await request.formData();
		const id = parseInt(data.get("identifier") as string);

        if (isNaN(id)) {
			return fail(422, {
				error: "id is NaN" 
			});
        }

		const lang = data.get("postlang") as string;

		if (!(["en", "pl", "jp"].includes(lang))) {
			return fail(422, "wrong language")
		}

		const post: Post = {
			title: data.get("posttitle") as string,
			content: data.get("postcontent") as string,
			language: lang as "en" | "pl" | "jp",
            tags: (data.get("posttags") as string).split(",").map((e) => e.trim()),
			published: data.get("postpublished") as string === 'true'
		};

		try {

			const something = await editPost(id, post);

			return {
				...something
			}
		} catch (error: any) {
			return fail(422, {
				error: error.message
			});
		}
	},

	removePost: async ({ request }) => {
		const data = await request.formData();

		const id = parseInt(data.get("identifier") as string);

        if (isNaN(id)) {
			return fail(422, {
				error: "id is NaN" 
			});
        }

		const confirm = data.get("consent") as string;
		if (confirm !== "yes") {
			return fail(403, {
				message: "You didn't consent to removing this, try again."
			})
		}

		try {
			const something = await removePost(id);

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