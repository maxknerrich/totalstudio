import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import path from "path";
import fs from "fs";

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

	console.log(html);

	return new Response(html.toString(), {
		headers: {
			'Content-Type': 'text/html'
		}
	});
}