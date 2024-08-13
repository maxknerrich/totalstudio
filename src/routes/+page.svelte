<script>
	/** @type {import('./$types').PageData} */
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

	export let data;

	const { files, user } = data;

	console.log({ files, user });
</script>

<nav>
	<h1>Pages</h1>
	<a href="/new">Create New Page</a>
</nav>
<div>
	{#each files as file}
		<a href="/edit/{file}">{file}</a>
	{/each}
</div>
<section>
	<h1>User</h1>
	<p>{user?.name}</p>
	<p>{user?.email}</p>
	<img src={user?.image} alt={user?.name} />
	<button on:click={() => signOut()}>Sign Out</button>
</section>

<style>
	section {
		flex: 0.6;
		display: flex;
		padding-top: 4rem;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
</style>
