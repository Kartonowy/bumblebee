import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { eq, getTableColumns, sql } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
    const post = await db.select({
        rowid: sql`rowid`,
        ...getTableColumns(posts)
    }).from(posts).where(eq(posts.published, true)).orderBy(posts.publishedAt);

    return {
        posts: post
    }
}


