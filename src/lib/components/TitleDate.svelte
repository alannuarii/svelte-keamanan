<script>
	export let title;
	import { createEventDispatcher } from 'svelte';
	import { date, getToday } from '../../lib/js/date';

	const dispatch = createEventDispatcher();

	const today = getToday();
	let tanggal = today;

	function selectDate(event) {
		tanggal = event.target.value;
		dispatch('tanggal', tanggal);
	}
</script>

<div class="mb-4 text-center">
	<h3>{title.toUpperCase()}</h3>
	<h5><i class="fi fi-rr-calendar-days me-1" /> {date(tanggal)}</h5>
</div>
<div class="mb-4 text-center">
	<h6>Masukkan tanggal {title}</h6>
	<input type="date" class="form-control" on:change={selectDate} />
</div>

<style>
	h3 {
		color: #2ec4b6;
		font-weight: 700;
	}
	h5 {
		font-size: 18px;
	}
	h6 {
		font-weight: 300;
	}
</style>
