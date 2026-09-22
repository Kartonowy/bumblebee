<script lang="ts">
    import { resolve } from '$app/paths';

	let { data, children } = $props();

</script>

<svelte:head>
	<link rel="icon" href="https://akiragallery.com/cdn/shop/files/Emil_Vinyl_Decal_from_Nier_1200x.webp" />
	<title>hacunae does moe!</title>
	<meta property="og:title" content="hacunae's great website" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://hacunae.moe/" />
	<meta property="og:image" content="https://akiragallery.com/cdn/shop/files/Emil_Vinyl_Decal_from_Nier_1200x.webp" />
</svelte:head>

<nav>
	<a href={resolve("/", {})}>Home</a>
	<a href={resolve("/tierlist", {})} data-sveltekit-preload-data>Tierlist</a>
	<a href={resolve("/tracker", {})} data-sveltekit-preload-data>Tracker</a>
	<a href={resolve("/dashboard", {})}>Dashboard</a>
	{#if data.logged}
    	<a href={resolve("/dashboard/edit/tierlist", {})}>Edit tierlist</a>
    	<a href={resolve("/dashboard/edit/tracker", {})}>Edit tracker</a>
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