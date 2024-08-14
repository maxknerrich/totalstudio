import path from 'path';
import fs from 'fs';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const text = data.get('text') as string;
		const title = data.get('title') as string;

		//slugify title
		const file = title
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-');
			
		if (!text) {
			return { type: 'error', status: 400 };
		}
		
		const filePath = path.join('static/files', file + '.md');
		
		try {
			fs.writeFileSync(filePath, text);
		} catch (err) {
			return { type: 'error', status: 500 };
		}
		//redirect back to home page after creating new file
		throw redirect(307, '/');
		
	}
};
