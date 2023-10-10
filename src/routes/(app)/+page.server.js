import { API_ENDPOINT } from '../../lib/js/endpoint';
import { rentangWaktu } from '../../lib/js/jadwal';
import { getDatetime } from '../../lib/js/date';

export const load = async () => {
	const piket = rentangWaktu();
	const now = getDatetime().slice(0,10)
	try {
		const [res1, res2] = await Promise.all([
			fetch(`${API_ENDPOINT}/get/patroli/get-note-patroli`).then((res) => res.json()),
			fetch(`${API_ENDPOINT}/get/presensi/get-piket/${piket}_${now}`).then((res) => res.json())
		]);

		return { data1: res1, data2: res2 };
	} catch (error) {
		console.error('Terjadi kesalahan', error);
		return { data1: null, data2: null };
	}
};
