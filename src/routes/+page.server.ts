import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { Resource } from 'sst';

const region = 'eu-central-1';
function generateUserFileURL(bucketName: string, fileName: string): string {
	return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ parent, locals }) {
	await parent();

	const session = await locals.auth();
	const id = session?.user?.email.split('@')[0];

	// Create an S3 client
	const s3 = new S3Client({});

	// List the objects in the S3 bucket under the prefix
	const command = new ListObjectsV2Command({
		Bucket: Resource.MyBucket.name,
		Prefix: id + '/'
	});

	const viewURL = generateUserFileURL(Resource.MyBucket.name, id);

	try {
		// Execute the command to list the files
		const response = await s3.send(command);

		// Extract the file names from the response
		const files =
			response.Contents?.map((item) => item.Key).filter((item) => item.endsWith('.md')) || [];

		const filesWithoutMd = files.map((file) => file?.replace(id + '/', '').replace('.md', ''));

		return { files: filesWithoutMd, viewURL };
	} catch (err) {
		console.error('Error listing files from S3', err);
		return { files: [] }; // Return an empty list if there is an error
	}
}
