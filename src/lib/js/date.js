export const convertDate = (tanggal) => {
	// membuat objek Date dengan parameter waktu Sat, 06 May 2023 00:00:00 GMT
	const date = new Date(tanggal);
	const months = [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember'
	];
	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();
	const formattedDate = `${day} ${months[monthIndex]} ${year}`;
	return formattedDate;
	// 6 Mei 2023
};

export function date(tanggal) {
	const date = new Date(tanggal);
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const result = date.toLocaleDateString('id-ID', options);
	return result;
	// 'Senin, 20 Februari 2023'
}

export const getToday = () => {
	let today = new Date();
	today.setHours(today.getHours() + 8);
	today = today.toISOString().slice(0, 10);
	return today;
	// 2023-02-21 tanggal hari ini
};

export const getDatetime = () => {
	let sekarang = new Date();
	sekarang.setHours(sekarang.getHours());
	const year = sekarang.getFullYear();
	const month = String(sekarang.getMonth() + 1).padStart(2, '0');
	const day = String(sekarang.getDate()).padStart(2, '0');
	const hours = String(sekarang.getHours()).padStart(2, '0');
	const minutes = String(sekarang.getMinutes()).padStart(2, '0');
	const seconds = String(sekarang.getSeconds()).padStart(2, '0');
	const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	return formattedDateTime;
	// Contoh keluaran: "2023-09-03 10:21:39"
};

export const getDatetimeServer = (time) => {
	let sekarang = new Date();
	sekarang.setHours(sekarang.getHours() + time);
	const year = sekarang.getFullYear();
	const month = String(sekarang.getMonth() + 1).padStart(2, '0');
	const day = String(sekarang.getDate()).padStart(2, '0');
	const hours = String(sekarang.getHours()).padStart(2, '0');
	const minutes = String(sekarang.getMinutes()).padStart(2, '0');
	const seconds = String(sekarang.getSeconds()).padStart(2, '0');
	const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	return formattedDateTime;
	// Contoh keluaran: "2023-09-03 10:21:39"
};

export const convertDatetime = (datetime) => {
	const tanggal = new Date(datetime);

	// Tambahkan 8 jam ke tanggal
	tanggal.setTime(tanggal.getTime() + 8 * 60 * 60 * 1000);

	const jam = tanggal.getUTCHours();
	const menit = tanggal.getUTCMinutes();
	const formatWaktu = (jam < 10 ? '0' : '') + jam + ':' + (menit < 10 ? '0' : '') + menit;
	return formatWaktu;
	// convert  2023-09-08T07:27:02.000Z to 07:27
};

export const getEpochTime = () => {
	const now = Date.now();
	const tanggal = new Date(now);
	tanggal.setHours(tanggal.getHours() + 0);
	const timestampSetelahPenambahan = tanggal.getTime();
	return timestampSetelahPenambahan
	// 1696962836404
};
