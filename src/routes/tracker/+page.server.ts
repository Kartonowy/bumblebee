import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { tracker } from '$lib/server/db/schema';
import { getTableColumns, sql } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
    const media = await db.select({
        rowid: sql`rowid`,
        ...getTableColumns(tracker)
    }).from(tracker);

    return {
        media
    }
}


