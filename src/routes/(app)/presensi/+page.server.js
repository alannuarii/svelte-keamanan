import { API_ENDPOINT } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const formData = new FormData();
		formData.append('nama', data.get('nama'));
		formData.append('shift', data.get('shift'));
		formData.append('waktu', data.get('waktu'));

		const parsedData = {};
		for await (const [name, value] of formData.entries()) {
			parsedData[name] = value;
		}

		const res = await fetch(`${API_ENDPOINT}/post/presensi/insert-presensi`, {
			method: 'POST',
			body: JSON.stringify(parsedData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const result = await res.json();

		if (result.message === 'Berhasil') {
			throw redirect(302, '/');
		}
	}
};
