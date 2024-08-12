<script lang="ts">
	import { onMount } from 'svelte';
	import { Crepe } from '@milkdown/crepe';
	import "@milkdown/crepe/theme/common/style.css";
	import "@milkdown/crepe/theme/nord-dark.css";
	import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';
	import { Editor, editorViewCtx, serializerCtx } from '@milkdown/kit/core';
	// import {getMarkdown} from '@milkdown/kit/utils';
  
	let crepe: Crepe | undefined;


// 	import type { Ctx } from '@milkdown/ctx'
// import { editorViewCtx, serializerCtx } from '@milkdown/core'

// /// Get content of the editor as markdown string.
// export function getMarkdown() {
//   return (ctx: Ctx): string => {
//     const view = ctx.get(editorViewCtx)
//     const serializer = ctx.get(serializerCtx)

//     return serializer(view.state.doc)
//   }
// }

	let outPut;
	
	export let defaultValue = '# Moin';

	onMount(() => {
		crepe = new Crepe({
			root: document.getElementById('editor'),
			defaultValue: defaultValue,
		});

		crepe.create();

		return () => {
			if (!crepe) return;
			crepe.destroy();
		};
	});

	function getMarkdown() {
		crepe?.editor.action((ctx) => {
				const editorView = ctx.get(editorViewCtx);
				const serializer = ctx.get(serializerCtx);
				const markdown = serializer(editorView.state.doc);
				console.log(markdown);
				console.log(editorView.state.doc.toJSON());
		});
	}

	function getJson() {
		crepe?.editor.action((ctx) => {
				const editorView = ctx.get(editorViewCtx);
				console.log(editorView.state.doc.toJSON());
	});
}

		
</script>

<div id="editor"></div>


<button on:click={() => getMarkdown()}>Get Markdown</button>
<button on:click={() => getJson()}>Get Json</button>