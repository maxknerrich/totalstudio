import { unified } from "unified";
import markdown from "remark-parse";
import pdf from "remark-pdf/node";
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

	const processor = unified().use(markdown).use(pdf, { output: "buffer" });

	const doc = await processor.process(fileBuffer);
	const pdfBuffer = await doc.result;

	return new Response(pdfBuffer, {
		headers: {
			'Content-Type': 'application/pdf'
		}
	});
}