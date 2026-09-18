<script lang='ts'>
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="?/addCard" use:enhance>
    <input type="text" name="cardname" placeholder="Card name" required />
    <input type="text" name="cardseries" placeholder="Card series" required />
    <input type="text" name="cardurl" placeholder="Card url" required />
    <input type="text" name="cardrank" placeholder="Card rank" required />
    <textarea name="description" placeholder="Description on placement"></textarea>
    <button>Submit</button>
</form>