<script lang="ts">
    import { resolve } from '$app/paths';
    import type { Post } from '$lib';

    const { data } = $props();
    console.log('e')

</script>
<h2>All Posts</h2>

{#snippet post_snippet(post: Post)}
    <div>
        <span>
            <a href={resolve(`/blog/${post.rowid}`, {})}><h3>{post.title}</h3></a>
            <span>—  {new Date(post.publishedAt!).toLocaleDateString("pl-PL")}</span>
        </span>
        <p>{post.content.split(" ").slice(0, 37).join(" ")}...</p>
        <span>
            lang: <span class="language">{post.language}</span>
            tags: {#each post.tags as tag (tag)} <span class="tag">{tag}</span> {/each}
        </span>
    </div>
{/snippet}

{#each data.posts as post (post.rowid)}
    {@render post_snippet(post)}
    <hr>
{/each}

<style>
span .tag {
    border: 1px solid black;
    margin: 0 2px 0 0;
    padding: 0 2px 0 2px;
}
h3 {
    display: inline-block;
}
</style>