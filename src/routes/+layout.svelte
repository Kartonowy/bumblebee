<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/">Home</a>
	<a href="/tierlist">Tierlist</a>
	<a href="/dashboard">Dashboard</a>
</nav>

{@render children()}


<style>
	@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap');
	:global(:root) {
		--background: #ffffff;
		--foreground: #ffffff;
		--text: #000000;
		--accent: #000000;
	}
	:global {
		* {
			font-family: "Fira Code", monospace;
		}
	}
	:global(body) {
		background: var(--background);
	}

</style>