<script>
	import { signOut } from '@auth/sveltekit/client';
	export let user;
</script>

<header class="container">
	<a href="/"><h1>Total Studio</h1></a>
	{#if user}
	<user>
		<img src={user?.image} alt={user?.name} />
		<usermeta>
			<p>{user?.name}</p>
			<p class="email">{user?.email}</p>
		</usermeta>
		<button class="secondary" on:click={() => signOut()}>Sign Out</button>
	</user>
	{/if}
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-block: 1rem;
		margin-bottom: 64px;
		flex-wrap: wrap;
	}

	@media (max-width: 768px) {
		header.container {
			gap: 32px;
			flex-direction: column;
		}
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
</style>
