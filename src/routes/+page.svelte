<script>
	/** @type {import('./$types').PageData} */
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

	export let data;

	const { files, user } = data;

	console.log({ files, user });
</script>

<header class="container">
	<h1>Total Studio</h1>
	<user>
		<img src={user?.image} alt={user?.name} />
		<usermeta>
			<p>{user?.name}</p>
			<p class="email">{user?.email}</p>
		</usermeta>
		<button class="secondary" on:click={() => signOut()}>Sign Out</button>
	</user>
</header>
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
	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-block: 1rem;
		margin-bottom: 64px;
	} 
	user {
		display: flex;
		align-items: center;
	}
	usermeta {
		margin-left: 12px;
		margin-right: 32px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}
	usermeta p {
		margin: 0;
	}
	.email {
		font-size: 0.75rem;
		opacity: 0.5;
	}
	img {
		border-radius: 50%;
		width: 48px;
		height: 48px;
	}
	pages a {
		background-color: rgba(255, 255, 255, .05);
		display: block;
		padding: 8px 16px;
		border-radius: 8px;
		margin-top: 24px;
	}
</style>
