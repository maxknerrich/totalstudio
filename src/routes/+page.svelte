<script>
	/** @type {import('./$types').PageData} */
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
	
	export let data;

	const files = data.files;

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
<!-- <section>
	<form on:submit|preventDefault={handleSubmit}>
		<input name="file" type="file" accept="image/png, image/jpeg" />
		<button type="submit">Download</button>
	</form>
	<h1>SvelteKit Auth Example</h1>
	<div>
		{#if $page.data.session}
			{#if $page.data.session.user?.image}
				<img src={$page.data.session.user.image} class="avatar" alt="User Avatar" />
			{/if}
			<span class="signedInText">
				<small>Signed in as</small><br />
				<strong>{$page.data.session.user?.name ?? 'User'}</strong>
			</span>
			<SignOut>
				<div slot="submitButton" class="buttonPrimary">Sign out</div>
			</SignOut>
		{:else}
			<span class="notSignedInText">You are not signed in</span>
			<SignIn provider="google" />
		{/if}
	</div>
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
</style> -->

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
</style>