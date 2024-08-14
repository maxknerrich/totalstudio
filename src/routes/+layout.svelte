<script>
	import Header from "$components/Header.svelte";

	export let data;

	const { user } = data;
</script>
<Header user={user}/>
<main class="container">
	<slot/>
</main>