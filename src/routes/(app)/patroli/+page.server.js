import { API_ENDPOINT } from '../../../lib/js/endpoint';
import { rentangWaktu } from '../../../lib/js/jadwal';
import { getDatetime } from '../../../lib/js/date';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const piket = rentangWaktu();
	const datetime = getDatetime()
	const now = datetime.slice(0, 10);
	try {
		const res2 = await fetch(`${API_ENDPOINT}/get/presensi/get-piket/${piket}_${now}`);
		const data2 = await res2.json();

		if (cookies.get('dataPatroli')) {
			const dataPatroli = cookies.get('dataPatroli');
			const data = JSON.parse(dataPatroli);
			return { data, data2 };
		}

		const data = '';
		return { data, data2 };
	} catch (error) {
		console.error('Terjadi kesalahan', error);
		throw error;
	}
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const formData = new FormData();
		formData.append('catatan', data.get('catatan'));
		if (data.get('kondisi') === null) {
			formData.append('kondisi', 'Aman');
		} else if (data.get('catatan') !== null) {
			formData.append('kondisi', data.get('catatan'));
		} else {
			formData.append('kondisi', data.get('kondisi'));
		}
		formData.append('waktu', data.get('waktu'));

		const uniqueCode = JSON.parse(cookies.get('dataPatroli'));
		formData.append('kode', uniqueCode[0].kode);

		const parsedData = {};
		for await (const [name, value] of formData.entries()) {
			parsedData[name] = value;
		}

		const res = await fetch(`${API_ENDPOINT}/post/patroli/insert-note-patroli`, {
			method: 'POST',
			body: JSON.stringify(parsedData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const result = await res.json();

		if (result.message === 'Berhasil') {
			throw redirect(302, '/patroli/reset');
		} else {
			// Handle kesalahan jika diperlukan
			console.error('Gagal memposting data');
		}
	}
};
