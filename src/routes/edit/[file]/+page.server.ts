import path from "path";
import fs from "fs";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
	const { file } = params;

	const filePath = path.join('static/files', file + '.md');

	if (!fs.existsSync(filePath)) {
		error(404, 'File not found');
	}

	const fileBuffer = fs.readFileSync(filePath);

	return {
		text: fileBuffer.toString()
	};
}
