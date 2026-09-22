<script lang="ts">
    const { data } = $props();
</script>

<main>
    <header> 
        <h1>{data.post.title}</h1>
        <span>on {data.post.publishedAt}</span>
    </header>
    <p>{@html data.post.content}</p>
</main>

<style>
main {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
}
@media only screen and (min-width: 600px)  {
    header {
        width: 60%;
    }
p {
    width: 60%;
}
}

p {
    white-space-collapse: preserve;
}
</style>