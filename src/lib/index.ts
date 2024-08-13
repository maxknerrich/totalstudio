import { collabServiceCtx } from '@milkdown/plugin-collab';
import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';

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

export function setupCollab(crepe) {
	if (!crepe) return;
	const doc = new Doc();
	const wsProvider = new WebsocketProvider('ws://localhost:1234', 'milkdown', doc);

	crepe.editor.action((ctx) => {
		const collabService = ctx.get(collabServiceCtx);
		collabService.bindDoc(doc).setAwareness(wsProvider.awareness).connect();
	});
}
