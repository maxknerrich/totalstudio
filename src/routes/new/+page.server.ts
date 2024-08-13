import path from 'path';
import fs from 'fs';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const text = data.get('text') as string;
		const file = data.get('title') as string;

		
		if (!text) {
			return { type: 'error', status: 400 };
		}
		
		const filePath = path.join('static/files', file + '.md');
		
		fs.writeFileSync(filePath, text);

		//redirect back to home page after creating new file
		throw redirect(307, '/');
		
	}
};
