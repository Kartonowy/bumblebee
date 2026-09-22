<script lang='ts'>
	import { enhance } from '$app/forms';
    import { defaultPost, type Post } from '$lib';

    const { data, form } = $props();

    let form_post: Post = $state({
		...defaultPost,
        title: "",
        content: "",
        language: "en",
        tags: [],
        published: false
    });
    let mode = $state("Adding");
    let identifier = $state(0);

    const handleMode = (_mode: string) => {
        mode = _mode;
    }
    const resetForm = () => {
        form_post.title = "";
        form_post.content = "";
        form_post.language = "en";
        form_post.tags = [];
        form_post.published = false
        mode = "Adding" 
    }
</script>

{#snippet post_snippet(post: Post, rowid: number)}
    <button onclick={() => {handleMode("Editing"); form_post = post; identifier = rowid }}>
        <h3>{post.title} <span class="language">{post.language}</span> <span class="published">{post.published ? "✓" : "✗" }</span></h3>
        <p>{post.content.split(" ").slice(0, 15).join(" ")}</p>
        <span>
            {#each post.tags as tag (tag)}
                <span>{tag}</span>
            {/each}
        </span>
    </button>
{/snippet}

<main>

<aside class="first">
<form method="POST" action={mode === "Editing" ? "?/editPost" : mode === "Removing" ? "?/removePost" : "?/addPost"} use:enhance>
    <h4>{mode} a post</h4>
    {#if mode === "Editing"}
    <input type="hidden" name="identifier" bind:value={identifier}/>
    {/if}
    {#if mode === "Removing"}
    <input type="hidden" name="identifier" bind:value={identifier}/>
    <input type="text" name="consent" placeholder="Are you sure?"/>
    {/if}
    <input type="text" name="posttitle" autocomplete="off" placeholder="Post Title" required bind:value={form_post.title}/>
    <textarea name="postcontent"  placeholder="Post content" required bind:value={form_post.content}></textarea>
    <select name="postlang" required bind:value={form_post.language}>
        <option value="en">en</option>
        <option value="pl">pl</option>
        <option value="jp">jp</option>
    </select>
    <input type="text" name="posttags" autocomplete="off" placeholder="Post tags" required bind:value={form_post.tags}/>
    <span>
        Publish? <input type="checkbox" name="postpublished" bind:checked={form_post.published}>
    </span>
    <span>
        <button>Submit</button>
        <button onclick={resetForm} formaction={undefined}>Clear</button> 
        {#if form_post.title !== "" }
            <button onclick={() => handleMode("Removing")} formaction={undefined}>Removing</button>
        {/if}
    </span>


</form>

    <!-- <img src={form_card.url} alt={form_card.name}>
    <h3>{form_card.name}</h3>
    <h5>{form_card.series}</h5>
    <input type="text" class="search" bind:value={search} >
    kk -->
<br>
<span>Message: {form?.message || form?.error}</span>


</aside>

<aside>
    {#each data.postList as post (post.rowid)}
        <!-- {#if card.name?.toLowerCase().includes(search.toLowerCase()) || card.series?.toLowerCase().includes(search.toLowerCase())} -->
            {@render post_snippet(post, post.rowid as number)}
        <!-- {/if} -->
    {/each}
</aside>


</main>


<style>
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
        display: flex;
        flex-flow: column wrap;
    }
    button {
        all: unset;
    }
    span span {
        border: 1px black solid;
        padding: 0px 2px 0px 2px;
        margin: 0 1px 0 0;
    }
    .language {
        color: gray
    }
</style>