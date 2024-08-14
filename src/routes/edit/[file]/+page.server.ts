import path from "path";
import fs from "fs";
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
	const { file } = params;

	const filePath = path.join('static/files', file + '.md');

	if (!fs.existsSync(filePath)) {
		error(404, 'File not found');
	}

	const fileBuffer = fs.readFileSync(filePath);

	return {
		text: fileBuffer.toString(),
		file
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();

		const text = data.get('text') as string;
		const file = params.file;

		if (!text || !file) {
			return { type: 'error', status: 400 };
		}

		const filePath = path.join('static/files', file + '.md');
		
		if(!fs.existsSync(filePath)) {
			return { type: 'error', status: 404 };
		}

		fs.writeFileSync(filePath, text);

		throw redirect(307, '/');
	}
}