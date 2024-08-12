import fs from 'fs';
import path from 'path';

export const GET = async ({ params }) => {
	const { imageName } = params;

	if (!fs.existsSync(path.join('static/uploads', imageName))) {
		return new Response('File not found', {
			status: 404
		});
	}

	const filePath = path.join('static/uploads', imageName);

	const fileBuffer = fs.readFileSync(filePath);
	const fileArrayBuffer = Buffer.from(fileBuffer);
	const fileType = imageName.split('.').pop();
	return new Response(fileArrayBuffer, {
		headers: {
			'Content-Type': 'image/' + fileType
		}
	});
}
