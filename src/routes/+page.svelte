<script>
	/** @type {import('./$types').PageData} */
	export let data;

	const { files } = data;
</script>

<section class="container">
	<nav>
		<h2>Your Pages</h2>
		<a href="/new" role="button">+ Create New</a>
	</nav>
	<pages>
	{#each files as file}
		<a href="/edit/{file}">{file}</a>
	{/each}
	</pages>
</section>

<style>
	pages a {
		background-color: rgba(255, 255, 255, .05);
		display: block;
		padding: 8px 16px;
		border-radius: 8px;
		margin-top: 24px;
	}
</style>
