import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

function generateImageUrl(fileName: string): string {
    return `http://localhost:5173/api/image/${fileName}`;
}

export const POST = async ({ request }) => {
    const data = await request.formData();
    const file = data.get('image') as File;

    if (!file) {
        return json({ error: 'File not found' }, { status: 400 });
    }

    const fileName = `${file.name}`;
    const filePath = path.join('static/uploads', fileName);

    // Create the uploads directory if it doesn't exist
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    const fileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer);

    // Save the file to the file system
    fs.writeFileSync(filePath, fileBuffer);

    const imageUrl = generateImageUrl(fileName);
    return json({ url: imageUrl });
};
