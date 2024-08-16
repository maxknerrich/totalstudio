import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { error } from "@sveltejs/kit";
import { Resource } from "sst";
import { Readable } from 'stream';

const streamToString = async (stream: Readable): Promise<string> => {
	return new Promise((resolve, reject) => {
		const chunks: any[] = [];
		stream.on('data', (chunk) => chunks.push(chunk));
		stream.on('error', reject);
		stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
	});
};



export const GET = async ({ params }) => {
	const { user, file } = params;
	const s3 = new S3Client({});

	const key = `${user + "/" + file}.html`;
	
	try {
		const command = new GetObjectCommand({ Bucket: Resource.MyBucket.name, Key: key });
		const response = await s3.send(command);
		const text = await streamToString(response.Body as Readable);

		//return html
		return new Response(text, {
			headers: {
				'Content-Type': 'text/html'
			}
		});
	} catch (err) {
		console.error('Error fetching file from S3', err);
		throw error(404, 'File not found');
	}
}

