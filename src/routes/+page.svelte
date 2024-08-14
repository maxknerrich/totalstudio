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
		<a href="/edit/{file}"><div>{file}</div></a>
	{/each}
	</pages>
</section>

<style>
	pages {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
		margin-top: 24px;
	}
	pages a {
		background-color: rgba(255, 255, 255, .05);
		padding: 16px;
		border-radius: 8px;
		display: flex;
		width: 100%;
		height: 100px;
		font-size: 1.5rem;
		text-decoration: none;
		align-items: center;
	}
	
	pages div {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
</style>
