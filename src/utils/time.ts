import moment from 'moment';

export const EVERY_15_MINUTES_IN_MILISECONDS = 900000;
export const EVERY_1_MINUTE = 1000 * 60;
export const EVERY_30_SECONDS = EVERY_1_MINUTE / 2;

export const getDateTime = (value: string, format = 'DD/MM/YYYY'): any => {
	const converted = moment(value).local().utc().toISOString();

	const convertedWithFormat = moment(converted).format(format);

	return convertedWithFormat;
};

export const getCurrentTime = (): any => moment().local().utc().toISOString();

export const hoursToMiliseconds = (timeInMiliseconds: number): any =>
	Math.floor(timeInMiliseconds / 1000 / 60 / 60);

export const minutesToMiliseconds = (timeInMiliseconds: number): any => {
	const h = hoursToMiliseconds(timeInMiliseconds);

	return Math.floor((timeInMiliseconds / 1000 / 60 / 60 - h) * 60);
};
