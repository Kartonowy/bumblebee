import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { tracker } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
    const media = await db.select().from(tracker);

    return {
        media
    }
}


