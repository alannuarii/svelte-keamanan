<script>
	import ModalNotif from './ModalNotif.svelte';
	export let path;
	export let icon;
	export let name;
	export let lock;
	export let id;
	export let pernyataan;
</script>

{#if lock}
	<div class="btn" data-bs-toggle="modal" data-bs-target="#{id}">
		<i class={icon} />
		<p>{name}</p>
	</div>
	<ModalNotif {id} {pernyataan} />
{:else}
	<div class="btn">
		<a href={path}><i class={icon} /></a>
		<p>{name}</p>
	</div>
{/if}

<style>
	p {
		margin: 0;
		font-size: 3vw;
		font-weight: 300;
		color: #ffffff;
	}
	a {
		text-decoration: none;
	}
	.btn {
		border: none;
		width: 20%;
	}

	i {
		padding: 0px 15px;
		/* border-radius: 50%; */
		font-size: 25px;
		/* background-color: #ffd59d; */
		color: #2ec4b6;
	}
</style>
