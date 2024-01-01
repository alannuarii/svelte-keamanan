<script>
	import { onMount, onDestroy, afterUpdate } from 'svelte';
	import jsQR from 'jsqr';
	import { locations } from '../js/locations';

	let mediaStream;
	let videoEl;
	let canvasEl;
	let isCanvasOn = false;
	let namaPiket;

	async function getRearCamera() {
		try {
			mediaStream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment' } // Ini mengatur kamera belakang
			});
			videoEl.srcObject = mediaStream;
			videoEl.play();
		} catch (error) {
			console.error('Tidak dapat mengakses kamera belakang:', error);
			// Handle kesalahan jika diperlukan
		}
	}

	function stopCamera() {
		if (videoEl && videoEl.srcObject) {
			const mediaStream = videoEl.srcObject;
			const tracks = mediaStream.getTracks();
			tracks.forEach((track) => track.stop());
		}
		if (videoEl) {
			videoEl.srcObject = null;
		}
	}

	async function startCanvas() {
		isCanvasOn = true;
		canvasEl = document.createElement('canvas');
		const context = canvasEl.getContext('2d');

		const scanQRCode = () => {
			if (videoEl && videoEl.readyState === videoEl.HAVE_ENOUGH_DATA) {
				context.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
				const imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height);
				const code = jsQR(imageData.data, imageData.width, imageData.height);
				if (code) {
					if (parseInt(code.data) < locations.length) {
						window.location.href = `/patroli/${code.data}${namaPiket.replace(/\s+/g, '')}`;
					}
				}
			}

			if (isCanvasOn) {
				requestAnimationFrame(scanQRCode);
			}
		};

		// Memulai pemindai QR Code
		if (videoEl) {
			requestAnimationFrame(scanQRCode);
		}
	}

	function stopCanvas() {
		isCanvasOn = false;
		if (canvasEl) {
			canvasEl = null;
		}
	}

	onMount(() => {
		const storedNamaShift = localStorage.getItem('namaShift');
		namaPiket = storedNamaShift
		getRearCamera();
	});

	afterUpdate(() => {
		if (!isCanvasOn) {
			startCanvas();
		}
	});

	onDestroy(() => {
		stopCanvas();
		stopCamera();
	});
</script>

<div class="webcam d-flex flex-column align-items-center border p-3 shadow-sm">
	<div class="position-relative foto-border">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video bind:this={videoEl} />
		<canvas
			class:d-none={isCanvasOn}
			width="240"
			height="320"
			bind:this={canvasEl}
			class="position-absolute top-50 start-50 translate-middle"
		/>
	</div>
</div>

<style>
	.webcam {
		border-radius: 20px;
	}
	video,
	canvas {
		width: 100%;
	}
	.foto-border {
		/* height: 640px; */
		width: 100%;
	}
</style>
