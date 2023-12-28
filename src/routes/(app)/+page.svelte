<script>
	import Menu from '../../lib/components/Menu.svelte';
	import Timer from '../../lib/components/Timer.svelte';
	import Personil from '../../lib/components/Personil.svelte';
	import Times from '../../lib/components/Times.svelte';
	import Info from '../../lib/components/Info.svelte';
	import { getPiket } from '../../lib/js/jadwal';

	export let data;
	const info = data.data1 !== null && data.data1.data.length > 0 ? data.data1.data[0] : null;
	const piket = data.data2 !== null && data.data2.data.length > 0 ? data.data2.data : [];
	let lockPresensi = false;

	if (piket.length >= getPiket().length) {
		lockPresensi = true;
	}

	const menus = [
		{
			path: '/patroli',
			icon: 'fi fi-rr-refresh',
			name: 'Patroli',
			lock: false
		},
		{
			path: '/apel',
			icon: 'fi fi-rr-users-alt',
			name: 'Apel',
			lock: false
		},
		{
			path: '/tamu',
			icon: 'fi fi-rr-person-simple',
			name: 'Tamu',
			lock: false
		},
		{
			path: '/presensi',
			icon: 'fi fi-rr-face-viewfinder',
			name: 'Presensi',
			lock: lockPresensi
		}
	];
</script>

<section>
	<div class="me-3">
		<Timer />
	</div>
	<div class="mx-3 py-3 row">
		<div class="col-9">
			<Personil names={piket} />
		</div>
		<div class="col-3 d-flex align-items-center">
			<Times />
		</div>
	</div>
	{#if info !== null}
		<div class="mx-3 py-2">
			<Info nama={info.nama} waktu={info.waktu} />
		</div>
	{/if}
	<nav class="navbar fixed-bottom shadow">
		<div class="container-fluid">
			{#each menus as menu}
				<Menu
					path={menu.path}
					icon={menu.icon}
					name={menu.name}
					lock={menu.lock}
					id={menu.name}
					pernyataan={'Anda tidak diperbolehkan'}
				/>
			{/each}
		</div>
	</nav>
</section>

<style>
	nav {
		height: 100px;
		border-radius: 30px 30px 0 0;
		background-color: #2b2d42;
	}
</style>
