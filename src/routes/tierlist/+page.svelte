<script lang="ts">
    const { data } = $props();

    let search = $state("");
    let hovered: Card | null = $state(null);

    type Card = {
        name: string | null;
        url: string | null;
        rank: string | null;
        series: string | null;
    }

    // horrid i know
    let cards: { "SSS": Card[], "SS": Card[], "S": Card[], "A": Card[], "B": Card[], "C": Card[], "D": Card[], "E": Card[], "F": Card[], [key: string]: Card[] } 
    = { "SSS": [], "SS": [], "S": [], "A": [], "B": [], "C": [], "D": [], "E": [], "F": [] };

    for (const rank in cards) {
        cards[rank] = data.cards.filter((card) => card.rank === rank)
    }

</script>

{#snippet card_snippet(card: Card)}
    <img src={card.url} alt={card.name} class="card" onmouseenter={() => {hovered = card}} onmouseleave={() => {hovered = null}} />
{/snippet}


<main>
    <input type="text" bind:value={search} placeholder="search"/> Hovering: {hovered ? `${hovered.name} from ${hovered.series}` : "nothing"}
</main>

<section>
{#each ["SSS", "SS", "S", "A", "B", "C", "D", "E", "F"] as tier}
    <h2>Tier: {tier}</h2>
    {#each cards[tier] as card}
        {#if card.name?.toLowerCase().includes(search.toLowerCase()) || card.series?.toLowerCase().includes(search.toLowerCase())}
            {@render card_snippet(card)}
        {/if}
    {/each}

    <hr>
{/each}
</section>

<style>
    .card {
        height: 130px;
    }
    main {
        position:fixed;
        background-color: #fff;
        padding: 10px 25px 10px 25px;
    }
    section {
        padding: 20px 2px 20px 2px;
    }
</style>