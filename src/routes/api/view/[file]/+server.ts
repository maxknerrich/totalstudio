import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import path from 'path';
import fs from 'fs';

export const GET = async ({ params }) => {
	const { file } = params;

	const filePath = path.join('static/files', file + '.md');

	if (!fs.existsSync(filePath)) {
		return new Response('File not found', {
			status: 404
		});
	}

	const fileBuffer = fs.readFileSync(filePath);

	//turn md into html using remark
	const html = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.process(fileBuffer.toString());

	const doc = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<meta http-equiv="X-UA-Compatible" content="ie=edge">
			<title>${file} | TotalStudio</title>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css">
		</head>
		<body>
			<main>
				${html}
			</main>
		</body>
		</html>`;

	return new Response(doc.toString(), {
		headers: {
			'Content-Type': 'text/html'
		}
	});
};
