<script>
	/** @type {import('./$types').PageData} */
	export let data;

	const { files, id, viewURL } = data;

</script>

<section class="container">
	<nav>
		<h2>Your Pages</h2>
		<a href="/new" role="button">+ Create New</a>
	</nav>
	<pages>
	{#each files as file}
	<article>
		<a href="/edit/{file}">{file}</a>
		<div>
			<a href="{viewURL}/{file}.html" target="_blank" class="secondary">View</a>
			<a href="{viewURL}/{file}.pdf" target="_blank" class="secondary">Download PDF</a>
		</div>
	</article>
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
	pages article {
		background-color: rgba(255, 255, 255, .05);
		padding: 16px;
		border-radius: 8px;
		display: flex;
		width: 100%;
		height: 100px;
		font-size: 1.5rem;
		text-decoration: none;
		align-items: center;
		justify-content: space-between;
	}
	
	pages article a {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	a.secondary {
		font-size: 1rem;
	}
</style>
