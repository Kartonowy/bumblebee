<script lang='ts'>
	import { enhance } from '$app/forms';
    import type { Media } from '$lib';

    const { data, form } = $props();

    let search = $state("");

    let form_media: Media = $state({
        rowid: null,
        name: "",
        url: "",
        type: "anime",
        year: new Date()
    });

    let mode = $state("Adding");
    let identifier = $state(0);

    const handleMode = (_mode: string) => {
        mode = _mode;
    }
    const resetForm = () => {
        form_media.name = "";
        form_media.url = "";
        form_media.type = "anime";
        mode = "Adding" 
        }
</script>

{#snippet media_snippet(media: Media)}
    <button onmousedown={() => {
        handleMode("Editing");
         form_media = media; 
        identifier = media.rowid as number;
        }}><img src={media.url} alt={media.name}/></button>
{/snippet}

<main>

<aside class="first">
<form method="POST" action={mode === "Editing" ? "?/editMedia" : mode === "Removing" ? "?/removeMedia" : "?/addMedia"} use:enhance>
    <h4>{mode} a card</h4>
    {#if mode === "Editing"}
    <input type="hidden" name="identifier" bind:value={identifier}/>
    {/if}
    {#if mode === "Removing"}
    <input type="hidden" name="identifier" bind:value={identifier}/>
    <input type="text" name="consent" placeholder="Are you sure?"/>
    {/if}
    <input type="text" name="medianame" autocomplete="off" placeholder="Media name" required bind:value={form_media.name}/>
    <input type="text" name="mediaurl" autocomplete="off" placeholder="Media url" required bind:value={form_media.url}/>
    <select name="mediatype" bind:value={form_media.type}>
        <option value="anime">anime</option>
        <option value="books">books</option>
        <option value="games">games</option>
        <option value="manga">manga</option>
        <option value="movies">movies</option>
        <option value="series">series</option>
    </select>
    <span>
        <button>Submit</button>
        <button onclick={resetForm} formaction={undefined}>Clear</button> 
        {#if form_media.name !== "" }
            <button onclick={() => handleMode("Removing")} formaction={undefined}>Removing</button>
        {/if}
    </span>

</form>
<span>Message: {form?.message || form?.error}</span>

<div>
    <img src={form_media.url} alt={form_media.name}>
    <h3>{form_media.name}</h3>
    <input type="text" class="search" bind:value={search} >
</div>


</aside>

<aside>
    {#each data.media as media (media.rowid)}
        {#if media.name?.toLowerCase().includes(search.toLowerCase())}
            {@render media_snippet(media)}
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
        width: 25%;
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
</style>