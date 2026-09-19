<script lang='ts'>
	import { enhance } from '$app/forms';
    import type { Media } from '$lib';

    const { data, form } = $props();

    let search = $state("");

    let form_media: Media = $state({
        name: "",
        url: "",
        type: "anime",
        year: new Date()
    });

    let mode = $state("Add");
    let identifier = $state("");

    const handleMode = (_mode: string) => {
        mode = _mode;
        if (_mode === "Edit") {identifier = form_media.name + ";&:" + form_media.url} else identifier = ""
    }
    const resetForm = () => { form_media.name = ""; form_media.url = ""; form_media.type = "anime";  mode = "Add" }
</script>

{#snippet media_snippet(media: Media)}
    <button onmousedown={() => {form_media = media}}><img src={media.url} alt={media.name}/></button>
{/snippet}

<main>

<aside class="first">
<form method="POST" action={mode === "Edit" ? "?/editMedia" : mode === "Remove" ? "?/removeMedia" : "?/addMedia"} use:enhance>
    <h4>{mode} a card</h4>
    {#if mode === "Edit"}
    <input type="hidden" name="identifier" bind:value={identifier}/>
    {/if}
    {#if mode === "Remove"}
    <input type="text" name="identifier" bind:value={identifier} placeholder="Are you sure?"/>
    {/if}
    <input type="text" name="medianame" autocomplete="off" placeholder="Media name" required bind:value={form_media.name}/>
    <input type="text" name="mediaurl" autocomplete="off" placeholder="Media url" required bind:value={form_media.url}/>
    <select name="mediatype" bind:value={form_media.type}>
        <option value="anime">anime</option>
        <option value="book">book</option>
        <option value="games">games</option>
        <option value="manga">manga</option>
        <option value="movies">movies</option>
        <option value="series">series</option>
    </select>
    <button>Submit</button><button onclick={resetForm}>Clear</button>

    <span>Message: {form?.message || form?.error}</span>

</form>

<div>
    <img src={form_media.url} alt={form_media.name}>
    <h3>{form_media.name}</h3>
    <input type="text" class="search" bind:value={search} >
{#if form_media.name !== "" }
    <button onclick={() => handleMode("Edit")}>Edit</button>
    <button onclick={() => handleMode("Remove")}>Remove</button>
{/if}
</div>


</aside>

<aside>
    {#each data.media as media (media.url)}
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