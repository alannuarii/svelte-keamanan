import { API_ENDPOINT } from '$env/static/private';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const formData = new FormData();
		formData.append('foto', data.get('foto'));
		formData.append('nama', data.get('nama'));
		formData.append('instansi', data.get('instansi'));
		formData.append('nphp', data.get('nphp'));
		formData.append('tujuan', data.get('tujuan'));

		const parsedData = {};
		for await (const [name, value] of formData.entries()) {
			parsedData[name] = value;
		}

		const res = await fetch(`${API_ENDPOINT}/post/tamu/insert-tamu`, {
			method: 'POST',
			body: JSON.stringify(parsedData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const result = res.json();

		return result;
	}
};
