<script lang='ts'>
	import { enhance } from '$app/forms';
    import type { Card } from '$lib';

    const { data, form } = $props();

    let search = $state("");
    let fandomUrl = $state("");

    let form_card: Card = $state({
        rowid: null,
        name: "",
        series: "",
        url: "",
        rank: "",
        explaination: ""
    });
    let mode = $state("Adding");
    let identifier = $state(0);

    const handleMode = (_mode: string) => {
        mode = _mode;
    }
    const resetForm = () => {
        form_card.name = "";
        form_card.rank = "";
        form_card.series = "";
        form_card.url = "";
        form_card.explaination = "";
        mode = "Adding" 
    }

    const handleImportFandom = async () => {
        if (fandomUrl === "") return;
        const response = await fetch('/dashboard/edit/tierlist', {
            method: "POST",
            body: JSON.stringify({ fandomUrl }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    const {title, series, preparedUrl} = await response.json();

    form_card.name = title;
    form_card.series = series;
    form_card.url = preparedUrl;

    }
</script>

{#snippet card_snippet(card: Card)}
    <button onclick={() => {
        handleMode("Editing"); form_card = card; identifier = card.rowid as number
        }} ><img src={card.url} alt={card.name} class="card"   /></button>
{/snippet}

<main>

<aside class="first">

<span>
    <input type="text" name="fandom" bind:value={fandomUrl}> <button onclick={handleImportFandom} formaction={undefined}>Import fandom</button>
</span>

<form method="POST" action={mode === "Editing" ? "?/editCard" : mode === "Removing" ? "?/removeCard" : "?/addCard"} use:enhance>
    <h4>{mode} a card</h4>
    {#if mode === "Editing"}
    <input type="hidden" name="identifier" bind:value={identifier}/>
    {/if}
    {#if mode === "Removing"}
    <input type="hidden" name="identifier" bind:value={identifier}/>
    <input type="text" name="consent" placeholder="Are you sure?"/>
    {/if}
    <input type="text" name="cardname" autocomplete="off" placeholder="Card name" required bind:value={form_card.name}/>
    <input type="text" name="cardseries" autocomplete="off" placeholder="Card series" required bind:value={form_card.series}/>
    <input type="text" name="cardurl" autocomplete="off" placeholder="Card url" required bind:value={form_card.url}/>
    <input type="text" name="cardrank" autocomplete="off" placeholder="Card rank" required bind:value={form_card.rank}/>
    <textarea name="cardexplaination" autocomplete="off" placeholder="Explaination on placement" bind:value={form_card.explaination}></textarea>
    <span>
        <button>Submit</button>
        <button onclick={resetForm} formaction={undefined}>Clear</button> 
        {#if form_card.name !== "" }
            <button formaction={undefined} onclick={() => handleMode("Removing")}>Removing</button>
        {/if}
    </span>


</form>

<div>
    <img src={form_card.url} alt={form_card.name}>
    <h3>{form_card.name}</h3>
    <h5>{form_card.series}</h5>
    <input type="text" class="search" bind:value={search} >
</div>

<span>Message: {form?.message || form?.error}</span>


</aside>

<aside>
    {#each data.cards as card (card.rowid)}
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
        overflow: scroll;
        height: 100vh;
    }
    button {
        all: unset;
    }
    img {
        height: 150px;
        width: 100px;
        object-fit: cover;
    }
</style>