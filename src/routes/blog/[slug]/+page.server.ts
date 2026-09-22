import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { eq, getTableColumns, sql } from 'drizzle-orm';
import type { Post } from '$lib';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const post: Post[] = await db.select({
        rowid: sql`rowid`,
        ...getTableColumns(posts)
    }).from(posts).where(eq(sql`rowid`, params.slug)).limit(1);
    console.log(post[0].content)

    if (post[0]) {
        return { post: post[0] }
    }

	error(404, 'Not found');
}


