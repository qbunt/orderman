<script context="module">
	export async function preload(page, session) {
		const { user } = session
		return {user}
	}
</script>
<script>
	export let user
</script>

<style>
	h1, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Leverage Order Manager</title>
</svelte:head>

<h1>Orderman</h1>
{#if user}
	<p>you are logged in as {user}</p>
{:else }
	<p>you're not logged in</p>
{/if}
