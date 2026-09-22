import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
    const post = await db.select({
        rowid: sql`rowid`,
        ...getTableColumns(posts)
    }).from(posts).where(eq(posts.published, true)).orderBy(desc(sql`rowid`));

    return {
        posts: post
    }
}


