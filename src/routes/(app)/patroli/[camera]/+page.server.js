import { API_ENDPOINT } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { generateUniqueCode } from '../../../../lib/js/unique';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const formData = new FormData();
		formData.append('foto', data.get('foto'));
		formData.append('nama', data.get('nama'));
		formData.append('shift', data.get('shift'));
		formData.append('waktu', data.get('waktu'));
		formData.append('lokasi', data.get('lokasi'));
		formData.append('catatan', data.get('catatan'));

		if (cookies.get('dataPatroli')) {
			const uniqueCode = JSON.parse(cookies.get('dataPatroli'));
			formData.append('kode', uniqueCode[0].kode);
		} else {
			formData.append('kode', generateUniqueCode());
		}

		const parsedData = {};
		for await (const [name, value] of formData.entries()) {
			parsedData[name] = value;
		}

		const res = await fetch(`${API_ENDPOINT}/post/patroli/insert-patroli`, {
			method: 'POST',
			body: JSON.stringify(parsedData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const result = await res.json();

		if (result.data.length > 0) {
			cookies.set('dataPatroli', JSON.stringify(result.data), {
				path: '/patroli',
				sameSite: 'strict'
			});
			throw redirect(302, '/patroli');
		} else {
			// Handle kesalahan jika diperlukan
			console.error('Gagal memposting data');
			throw redirect(302, '/patroli');
		}
	}
};
