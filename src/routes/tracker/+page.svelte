<script lang="ts">
    import type { Media } from '$lib';

    const { data } = $props();

</script>
<h2>Media I've consumed this year</h2>

{#snippet media_snippet(media: Media)}
    <img src={media.url} alt={media.name} class="card" />
{/snippet}

{#each ["anime", "books", "games", "manga", "movies", "series"] as category (category)}
    <h2>Category: {category}</h2>
    <div class="shelf">
    {#each data.media.filter(m => m.type === category) as media (media.url)}
            {@render media_snippet(media)}
    {/each}
    </div>

    <hr>
{/each}

<style>
    .card {
        height: 200px;
    }
    .shelf {
        display:flex;
        flex-flow: row wrap;
        width: 100%;
    }
</style>