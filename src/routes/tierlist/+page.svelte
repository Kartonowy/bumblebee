<script lang="ts">
    import type { Card } from '$lib';
    const { data } = $props();

    let search = $state("");
    let hovered: Card | null = $state(null);

</script>

{#snippet card_snippet(card: Card)}
    <img src={card.url} alt={card.name} class="card" onmouseenter={() => {hovered = card}} onmouseleave={() => {hovered = null}} />
{/snippet}


<main class="topbar">
    <input type="text" bind:value={search} placeholder="search"/> Hovering: {hovered ? `${hovered.name} from ${hovered.series}` : "nothing"}
</main>

<section>
{#each ["SSS", "SS", "S", "A", "B", "C", "D", "E", "F"] as tier (tier)}
    <h2>Tier: {tier}</h2>
    <div class="shelf">
    {#each data.cards.filter((card) => card.rank === tier) as card (card.url)}
        {#if card.name?.toLowerCase().includes(search.toLowerCase()) || card.series?.toLowerCase().includes(search.toLowerCase())}
            {@render card_snippet(card)}
        {/if}
    {/each}
    </div>

    <hr>
{/each}
</section>
If any of the images don't work, tell me; I know about dagger, league and terraria atm, and will fix them soon. <br>
If you want to discuss any of the placements or suggest your own characters to add to the tierlist, come chat with me!

<style>
    .card {
        height: 130px;
        /* background-color: var(--foreground); */
    }
    main {
        position:fixed;
        padding: 10px 25px 10px 25px;
    }
    section {
        padding: 20px 2px 20px 2px;
    }
    .shelf {
        display:flex;
        flex-flow: row wrap;
        width: 100%;
    }
</style>