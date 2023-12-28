<script>
	import DropdownHeader from '../components/DropdownHeader.svelte';
	import { page } from '$app/stores';

	$: path = $page.url.pathname;
	let backPath;

	$: {
		let splitPath = path.split('/');
		splitPath.pop('/');
		backPath = splitPath.join('/');
	}

	function refresh() {
		window.location.reload();
	}
</script>

<nav class="navbar shadow-sm">
	<div class="container-fluid">
		{#if path === '/'}
			<p class="text-center ms-auto">Security App</p>
			<div class="ms-auto me-1"><DropdownHeader /></div>
		{:else if backPath !== ''}
			<a class="navbar-brand" href={backPath}><i class="fi fi-rr-angle-left" /></a>
			<p class="text-center ms-auto">Security App</p>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="ms-auto" on:click={refresh}><i class="fi fi-rr-rotate-right me-2" /></div>
		{:else}
			<a class="navbar-brand" href="/"><i class="fi fi-rr-angle-left" /></a>
			<p class="text-center ms-auto">Security App</p>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="ms-auto" on:click={refresh}><i class="fi fi-rr-rotate-right me-2" /></div>
		{/if}
	</div>
</nav>

<style>
	nav {
		height: 70px;
		background-color: #2b2d42;
		color: #ffffff;
	}
	p {
		margin: 0;
		font-size: 5vw;
		font-weight: 700;
	}
	.fi {
		color: #ffffff;
	}
</style>
