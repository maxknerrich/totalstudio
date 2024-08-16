import { json } from '@sveltejs/kit';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Resource } from 'sst';

// You can replace this with the region your bucket is deployed in.
const region = 'eu-central-1';

function generateImageUrl(bucketName: string, fileName: string): string {
	return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
}

export const POST = async ({ request }) => {
	const data = await request.formData();
	const file = data.get('image') as File;

	if (!file) {
		return json({ error: 'File not found' }, { status: 400 });
	}

	const fileName = `${Date.now()}-${file.name}`; // Add a timestamp to avoid overwriting
	const fileArrayBuffer = await file.arrayBuffer();
	const fileBuffer = Buffer.from(fileArrayBuffer);

	// Create an S3 client
	const s3 = new S3Client({});

	// Generate the S3 key for the image
	const key = `images/${fileName}`;

	// Create a PutObjectCommand to upload the image to S3
	const putCommand = new PutObjectCommand({
		Bucket: Resource.MyBucket.name,
		Key: key,
		Body: fileBuffer,
		ContentType: file.type // Set the correct content type
	});

	try {
		// Upload the image to S3
		await s3.send(putCommand);

		// Generate the public URL for the uploaded image
		const imageUrl = generateImageUrl(Resource.MyBucket.name, key);

		return json({ url: imageUrl });
	} catch (err) {
		console.error('Error uploading image to S3', err);
		return json({ error: 'Failed to upload image' }, { status: 500 });
	}
};
