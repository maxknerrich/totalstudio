import { generateHTML, generatePDF } from '$lib/generate';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { redirect } from '@sveltejs/kit';
import { Resource } from 'sst';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();

		const text = data.get('text') as string;
		const title = data.get('title') as string;

		const session = await locals.auth();

		//slugify title
		const file = title
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-');

		if (!text) {
			return { type: 'error', status: 400 };
		}

		// Generate the key for the markdown file
		const id = session?.user?.email.split('@')[0] + '/';
		const key = `${id}${file}.md`;

		// Create a PutObjectCommand to upload the markdown file
		const command = new PutObjectCommand({
			Bucket: Resource.MyBucket.name,
			Key: key,
			ContentType: 'text/markdown',
			Body: text // The markdown content
		});

		// Create an S3 client
		const s3 = new S3Client({});

		const html = await generateHTML(text, file);
		const pdf = await generatePDF(text);

		const putHTMLCommand = new PutObjectCommand({
			Bucket: Resource.MyBucket.name,
			Key: `${id + file}.html`,
			ContentType: 'text/html',
			Body: html
		});

		const putPDFCommand = new PutObjectCommand({
			Bucket: Resource.MyBucket.name,
			Key: `${id + file}.pdf`,
			ContentType: 'application/pdf',
			Body: pdf
		})
			

		try {
			// Execute the command to upload the file
			await Promise.all([s3.send(command), s3.send(putHTMLCommand), s3.send(putPDFCommand)]);
		} catch (err) {
			console.error('Error uploading file to S3', err);
			return { type: 'error', status: 500, message: 'Failed to save file to S3' };
		}

		// Redirect to the homepage after creating the new file
		throw redirect(307, '/');
	}
};
