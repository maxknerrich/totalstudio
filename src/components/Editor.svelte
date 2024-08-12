<script lang="ts">
	import { onMount } from 'svelte';
	import { Crepe } from '@milkdown/crepe';
	import '@milkdown/crepe/theme/common/style.css';
	import '@milkdown/crepe/theme/nord-dark.css';
	import { editorViewCtx, serializerCtx } from '@milkdown/kit/core';
	import { imageUpload } from '$lib'
	import { gfm } from '@milkdown/kit/preset/gfm';

	let crepe: Crepe | undefined;

	export let defaultValue = '# Moin';

	onMount(() => {
		crepe = new Crepe({
			root: document.getElementById('editor'),
			featureConfigs: {
				'image-block': {
					async blockOnUpload(file) {
						return await imageUpload(file);
					},
					async inlineOnUpload(file) {
						return await imageUpload(file);
					}
				}
			},
			defaultValue: defaultValue
		});

		crepe.create();

		return () => {
			if (!crepe) return;
			crepe.destroy();
		};
	});

	function getMarkdown() {
		return crepe?.editor.action((ctx) => {
			const editorView = ctx.get(editorViewCtx);
			const serializer = ctx.get(serializerCtx);
			const markdown = serializer(editorView.state.doc);
			return markdown;
		});
	}

	function getJson() {
		return crepe?.editor.action((ctx) => {
			const editorView = ctx.get(editorViewCtx);
			const json = editorView.state.doc.toJSON();
			return json;
		});
	}
</script>

<div id="editor"></div>

<button on:click={() => console.log(getMarkdown())}>Get Markdown</button>
<button on:click={() => console.log(getJson())}>Get Json</button>
