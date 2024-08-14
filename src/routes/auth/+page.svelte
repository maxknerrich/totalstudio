<script>
	import { signIn } from '@auth/sveltekit/client';
</script>

<section class="container">
	<h2>Login</h2>
	<button on:click={() => signIn('google')}>Google Login</button>
</section>
