import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import markdown from "remark-parse";
import pdf from "remark-pdf/node";
export async function generateHTML(markdown, title) {
	const html = await unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeSanitize)
		.use(rehypeStringify)
		.process(markdown.toString());

		const doc = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<meta http-equiv="X-UA-Compatible" content="ie=edge">
			<title>${title} | TotalStudio</title>
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css">
		</head>
		<body>
			<main>
				${html}
			</main>
		</body>
		</html>`;

	return doc;
}

export async function generatePDF(md) {
	const processor = unified().use(markdown).use(pdf, { output: "buffer" });

	const doc = await processor.process(md);
	const pdfBuffer = await doc.result;
	return pdfBuffer;
}