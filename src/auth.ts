import { SvelteKitAuth } from '@auth/sveltekit';
import google from '@auth/sveltekit/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth(async () => {
	const authOptions = {
		providers: [
			google({
				clientId: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET
			})
		],
		secret: NEXTAUTH_SECRET,
		trustHost: true
	};
	return authOptions;
});
