import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }: PageServerLoad) => {
	const session = await locals.auth();
	const isAuthRoute = url.pathname === '/auth';

	if (!session?.user) {
		if (!isAuthRoute) {
			console.log('throw');
			throw redirect(303, '/auth');
		} else {
			return null;
		}
	}

	if (isAuthRoute) {
		throw redirect(303, '/');
	}

	return { user: session.user };
};
