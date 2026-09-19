<script lang='ts'>
	import { enhance } from '$app/forms';
    import type { Card } from '$lib';

    const { data, form } = $props();

    let search = $state("");

    let form_card: Card = $state({
        name: "",
        series: "",
        url: "",
        rank: "",
        explaination: ""
    });
    let mode = $state("Add");
    let identifier = $state("");

    const handleMode = (_mode: string) => {
        mode = _mode;
        identifier = form_card.name + ";&:" + form_card.series
    }
    const resetForm = () => { form_card.name = ""; form_card.rank = ""; form_card.series = ""; form_card.url = ""; form_card.explaination = "";  mode = "Add" }
</script>

{#snippet card_snippet(card: Card)}
    <button onmousedown={() => {form_card = card}}><img src={card.url} alt={card.name} class="card"   /></button>
{/snippet}

<main>

<aside class="first">
<form method="POST" action={mode === "Edit" ? "?/editCard" : mode === "Remove" ? "?/removeCard" : "?/addCard"} use:enhance>
    <h4>{mode} a card</h4>
    {#if mode === "Edit"}
    <input type="hidden" name="identifier" bind:value={identifier}/>
    {/if}
    <input type="text" name="cardname" autocomplete="off" placeholder="Card name" required bind:value={form_card.name}/>
    <input type="text" name="cardseries" autocomplete="off" placeholder="Card series" required bind:value={form_card.series}/>
    <input type="text" name="cardurl" autocomplete="off" placeholder="Card url" required bind:value={form_card.url}/>
    <input type="text" name="cardrank" autocomplete="off" placeholder="Card rank" required bind:value={form_card.rank}/>
    <textarea name="cardexplaination" autocomplete="off" placeholder="Explaination on placement" bind:value={form_card.explaination}></textarea>
    <button>Submit</button><button onclick={resetForm}>Clear</button>

    <span>Message: {form?.message || form?.error}</span>

</form>

<div>
    <img src={form_card.url} alt={form_card.name}>
    <h3>{form_card.name}</h3>
    <h5>{form_card.series}</h5>
    <input type="text" class="search" bind:value={search} >
{#if form_card.name !== "" }
    <button onclick={() => handleMode("Edit")}>Edit</button>
    <button onclick={() => handleMode("Remove")}>Remove</button>
{/if}
</div>


</aside>

<aside>
    {#each data.cards as card}
        {#if card.name?.toLowerCase().includes(search.toLowerCase()) || card.series?.toLowerCase().includes(search.toLowerCase())}
            {@render card_snippet(card)}
        {/if}
    {/each}
</aside>


</main>


<style>
.search {
    width: 20%;
    padding: 0 0.2vw 0 0.2vw;
}
.first {
    display: flex;
    flex-flow: column wrap;
}
.first div, .first form {
    height: 40vh;
}
    main {
        display: flex;
        flex-flow: row wrap;
    }
    form {
        display: flex;
        flex-flow: column wrap;
        width: 20%;
        padding-right: 30%;
    }
    aside {
        width: 50%;
    }
    button {
        all: unset;
    }
    img {
        height: 150px;
        width: 100px;
        object-fit: cover;
    }
    span {
        border: 1px black solid;
    }
</style>