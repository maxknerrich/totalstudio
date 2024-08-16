<script lang="ts">
	import { onMount } from 'svelte';
	import { Crepe } from '@milkdown/crepe';
	import '@milkdown/crepe/theme/common/style.css';
	import '@milkdown/crepe/theme/nord-dark.css';
	import { editorViewCtx, serializerCtx } from '@milkdown/kit/core';
	import { imageUpload, setupCollab } from '$lib'
	import { collab } from '@milkdown/plugin-collab';
	let crepe: Crepe | undefined;

	export let defaultValue = '';
	export let enableCollab = false;

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

		if (enableCollab) {			
			crepe.editor.use(collab);
			crepe.create().then(() => setupCollab(crepe));
		} else {
			crepe.create();
		}

		return () => {
			if (!crepe) return;
			crepe.destroy();
		};
	});


	export function getMarkdown() {
		return crepe?.editor.action((ctx) => {
			const editorView = ctx.get(editorViewCtx);
			const serializer = ctx.get(serializerCtx);
			const markdown = serializer(editorView.state.doc);
			return markdown;
		});
	}

	export function getJson() {
		return crepe?.editor.action((ctx) => {
			const editorView = ctx.get(editorViewCtx);
			const json = editorView.state.doc.toJSON();
			return json;
		});
	}
</script>

<div id="editor"></div>


<style>
:global(.ProseMirror-yjs-cursor) {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-color: orange;
  word-break: normal;
  pointer-events: none;
}
/* This renders the username above the caret */
:global(.ProseMirror-yjs-cursor > div) {
  position: absolute;
  top: -1.05em;
  left: -1px;
  font-size: 13px;
  background-color: rgb(250, 129, 0);
  font-family: serif;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  user-select: none;
  color: white;
  padding-left: 2px;
  padding-right: 2px;
  white-space: nowrap;
}
:global(.milkdown) {
	border-radius: 8px;
}
</style>