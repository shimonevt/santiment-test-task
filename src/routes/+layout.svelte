<script>
	import Dialogs from 'webkit/ui/Dialog/Dialogs.svelte';

	import './styles.css';
</script>

<div class="app">
	<main><slot /></main>
</div>

{#if process.browser}
	<Dialogs />
{/if}

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
