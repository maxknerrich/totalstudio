import {
	S3Client,
	GetObjectCommand,
	HeadObjectCommand,
	PutObjectCommand
} from '@aws-sdk/client-s3';
import { Resource } from 'sst';
import { error } from '@sveltejs/kit';
import { Readable } from 'stream';

const s3 = new S3Client({});

/**
 * Convert a Readable stream to a string.
 * @param {Readable} stream
 * @returns {Promise<string>}
 */
const streamToString = async (stream: Readable): Promise<string> => {
	return new Promise((resolve, reject) => {
		const chunks: any[] = [];
		stream.on('data', (chunk) => chunks.push(chunk));
		stream.on('error', reject);
		stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
	});
};

/**
 * Check if a file exists in the S3 bucket.
 * @param {string} bucketName
 * @param {string} key
 * @returns {Promise<boolean>}
 */
const fileExistsInS3 = async (bucketName: string, key: string): Promise<boolean> => {
	const command = new HeadObjectCommand({ Bucket: bucketName, Key: key });
	try {
		await s3.send(command);
		return true;
	} catch {
		return false;
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const { file } = params;
	const session = await locals.auth();
	const prefix = session?.user?.email + '/';

	const key = `${prefix + file}.md`;

	try {
		const command = new GetObjectCommand({ Bucket: Resource.MyBucket.name, Key: key });
		const response = await s3.send(command);
		const text = await streamToString(response.Body as Readable);

		return { text, file };
	} catch (err) {
		console.error('Error fetching file from S3', err);
		throw error(404, 'File not found');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, params, locals }) => {
		const data = await request.formData();
		const text = data.get('text') as string;
		const file = params.file;

		const session = await locals.auth();
		const prefix = session?.user?.email + '/';

		if (!text || !file) {
			return { type: 'error', status: 400 };
		}

		const key = `${prefix + file}.md`;

		// Check if the file exists in S3
		if (!(await fileExistsInS3(Resource.MyBucket.name, key))) {
			console.error('File not found in S3');
			return { type: 'error', status: 404, message: 'File not found' };
		}

		// Create a PutObjectCommand to overwrite the existing markdown file
		const putCommand = new PutObjectCommand({
			Bucket: Resource.MyBucket.name,
			Key: key,
			ContentType: 'text/markdown',
			Body: text
		});

		try {
			// Execute the command to save the updated file
			await s3.send(putCommand);
			return { type: 'success', status: 200 };
		} catch (err) {
			console.error('Error saving file to S3', err);
			return { type: 'error', status: 500, message: 'Failed to save file to S3' };
		}
	}
};
