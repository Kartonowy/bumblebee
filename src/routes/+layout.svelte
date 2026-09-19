<script lang="ts">
    import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';

	let { data, children } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href={resolve("/", {})}>Home</a>
	<a href={resolve("/tierlist", {})} data-sveltekit-preload-data>Tierlist</a>
	<a href={resolve("/tracker", {})} data-sveltekit-preload-data>Tracker</a>
	<a href={resolve("/dashboard", {})}>Dashboard</a>
	{#if data.logged}
    	<a href={resolve("/dashboard/edit/tierlist", {})}>Edit tierlist</a>
	{/if}
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
		a {
			color: var(--text)
		}
		a:visited {
			all: unset;
			color: var(--text)
		}
	}
	:global(body) {
		background: var(--background);
	}

	nav {
		padding: 0.5vh 0.5vw 0.5vh 0.5vw;
	}
</style>