import { getToday } from './date';
import { namaSecurity } from './nama';

export const jadwalPiket = (tanggal) => {
	const numberOfDays = 365;
	const imran = [0, 'p', 'p', 'p', 'p', 'p', 0];
	const faisal = [0, 'p', 'p', 's', 's', 'm', 'm', 0, 0, 'm'];
	const karter = ['s', 'm', 'm', 0, 0, 'm', 0, 'p', 'p', 's'];
	const jerry = [0, 'm', 0, 'p', 'p', 's', 's', 'm', 'm', 0];
	const refi = ['p', 's', 's', 'm', 'm', 0, 0, 'm', 0, 'p'];
	const jonly = ['m', 0, 0, 'm', 0, 'p', 'p', 's', 's', 'm'];

	const imranCycle = [];
	const faisalCycle = [];
	const karterCycle = [];
	const jerryCycle = [];
	const refiCycle = [];
	const jonlyCycle = [];
	const dateArray = [];

	for (let i = 0; i < numberOfDays; i++) {
		imranCycle.push(imran[i % imran.length]);
		faisalCycle.push(faisal[i % faisal.length]);
		karterCycle.push(karter[i % karter.length]);
		jerryCycle.push(jerry[i % jerry.length]);
		refiCycle.push(refi[i % refi.length]);
		jonlyCycle.push(jonly[i % jonly.length]);

		let date = new Date('2023-01-01');
		date.setDate(date.getDate() + i);
		dateArray.push(date);
	}

	//   const targetDate = new Date(tanggal);
	const index = dateArray.findIndex((date) => date.toISOString().substr(0, 10) === tanggal);

	return {
		imran: imranCycle[index],
		faisal: faisalCycle[index],
		karter: karterCycle[index],
		jerry: jerryCycle[index],
		refi: refiCycle[index],
		jonly: jonlyCycle[index]
	};
};

export const rentangWaktu = () => {
	const sekarang = new Date();
	const jam = sekarang.getHours();
	// const menit = sekarang.getMinutes();

	if (jam >= 0 && jam < 8) {
		return 'm';
	} else if (jam >= 8 && jam < 16) {
		return 'p';
	} else if (jam >= 16 && jam < 24) {
		return 's';
	}
};

export const rentangWaktuServer = (time) => {
	let sekarang = new Date();
	sekarang.setHours(sekarang.getHours() + time);
	const jam = sekarang.getHours();

	if (jam >= 0 && jam < 8) {
		return 'm';
	} else if (jam >= 8 && jam < 16) {
		return 'p';
	} else if (jam >= 16 && jam < 24) {
		return 's';
	}
};

export const getPiket = () => {
	const today = getToday();
	const object = jadwalPiket(today);
	const value = rentangWaktu();
	const arrName = Object.keys(object).filter((key) => object[key] === value);
	const arrNama = [];
	arrName.forEach((name) => {
		arrNama.push(namaSecurity(name));
	});
	return arrNama;
};
