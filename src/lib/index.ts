export async function imageUpload(file) {
	//sent to svelte endpoint
	const formData = new FormData();
	formData.append('image', file);

	const response = await fetch('/api/upload', {
		method: 'POST',
		body: formData
	});

	const result = await response.json();
	return result.url;
}
