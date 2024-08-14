<script lang="ts">
	import { enhance } from "$app/forms";
	import Editor from "$components/Editor.svelte";
	import type { SubmitFunction } from "@sveltejs/kit";

	let EditorComponent;
	export let data;
	const { text } = data;

	const handleFormSubmit: SubmitFunction = async ({ formData }) => {
		const markdown = EditorComponent.getMarkdown(); // Get markdown from the editor
		formData.set('text', markdown); // Append markdown to form data
	};
</script>

<form method="POST" use:enhance={handleFormSubmit}>
		<input type="text" name="title" placeholder="Title"/>
		<button type="submit">Save</button>
</form>
<Editor defaultValue={text} bind:this={EditorComponent}></Editor>

<style>
	form {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	input {
		max-width: 500px;
	}
	button {
		width: fit-content;
		padding-inline: 24px;
	}
</style>