<script lang="ts">
    import type { Post } from '$lib';

    const { data } = $props();
    console.log('e')

</script>
<h2>All Posts</h2>

{#snippet post_snippet(post: Post)}
    <div>
        <h3>{post.title} <span class="language">{post.language}</span> {new Date(post.publishedAt!).toLocaleDateString("pl-PL")}</h3>
        <p>{post.content.split(" ").slice(0, 37).join(" ")}...</p>
        <span>
            tags: {#each post.tags as tag (tag)} <span>{tag}</span> {/each}
        </span>
    </div>
{/snippet}

{#each data.posts as post (post.rowid)}
    {@render post_snippet(post)}
    <hr>
{/each}

<style>
span span {
    border: 1px solid black;
    margin: 0 2px 0 0;
    padding: 0 2px 0 2px;
}

</style>