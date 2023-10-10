import { API_ENDPOINT } from '../../lib/js/endpoint';
import { rentangWaktuServer } from '../../lib/js/jadwal';
import { getDatetimeServer } from '../../lib/js/date';

export const load = async () => {
	const piket = rentangWaktuServer();
	const datetime = getDatetimeServer()
	const now = datetime.slice(0, 10);
	try {
		const [res1, res2] = await Promise.all([
			fetch(`${API_ENDPOINT}/get/patroli/get-note-patroli`).then((res) => res.json()),
			fetch(`${API_ENDPOINT}/get/presensi/get-piket/${piket}_${now}`).then((res) => res.json())
		]);

		return { data1: res1, data2: res2, data3: piket, data4: datetime };
	} catch (error) {
		console.error('Terjadi kesalahan', error);
		return { data1: null, data2: null };
	}
};
