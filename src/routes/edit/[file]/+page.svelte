<script>
	import Editor from "$components/Editor.svelte";
	let EditorComponent;
	export let data;
	const { text } = data
</script>
<nav>
	<h1>Edit Page</h1>
	<button on:click={() => console.log(EditorComponent.getMarkdown())}>Save</button>
</nav>
<Editor defaultValue={text} bind:this={EditorComponent}></Editor>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	div {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>