<script>
	import pagi from '../img/pagi.png';
	import sore from '../img/sore.png';
	import malam from '../img/malam.png';

	export let piket;

	let waktu;

	if (piket === 'm') {
		waktu = malam;
	} else if (piket === 'p') {
		waktu = pagi;
	} else {
		waktu = sore;
	}
</script>

<div>
	<img src={waktu} class="img-fluid" alt="" />
</div>
