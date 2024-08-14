<script lang="ts">
	import { enhance } from "$app/forms";
	import Editor from "$components/Editor.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";

	let EditorComponent;
	export let data;
	const { text, file } = data;

	const handleFormSubmit: SubmitFunction = async ({ formData }) => {
		const markdown = EditorComponent.getMarkdown(); // Get markdown from the editor
		formData.set('text', markdown); // Append markdown to form data
	};
</script>

<nav>
	<h1>Edit <mark>{file}</mark></h1>
	<form method="POST" use:enhance={handleFormSubmit}>
		<button type="submit">Save</button>
	</form>
</nav>
<Editor defaultValue={text} bind:this={EditorComponent}></Editor>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	mark {
		color: var(--pico-primary);
		background-color: transparent;
	}
</style>