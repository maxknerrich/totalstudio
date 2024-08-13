import fs from 'fs';

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
	await parent();

	//return all possible file names from static/files without returning the content
	const files = fs.readdirSync('static/files');

	//remove the .md from the file name
	const filesWithoutMd = files.map((file) => file.replace('.md', ''));
	return { files: filesWithoutMd };
}
