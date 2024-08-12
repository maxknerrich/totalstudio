<script lang="ts">
	import { onMount } from 'svelte';
	import { Crepe } from '@milkdown/crepe';
	import "@milkdown/crepe/theme/common/style.css";
	import "@milkdown/crepe/theme/nord-dark.css";
  
	let crepe: Crepe | undefined;

	export let defaultValue;
  
	onMount(() => {
	  crepe = new Crepe({
		root: document.getElementById('editor'),
		defaultValue: defaultValue,
	  });
  
	  crepe.create().then();
  
	  return () => {
		if (!crepe) return;
		crepe.destroy();
	  };
	});
  </script>
  
  <div id="editor" style="height: 100vh;"></div>