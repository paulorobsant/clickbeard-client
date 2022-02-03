import { camelCase, snakeCase, isPlainObject, isArray, set } from 'lodash';

/**
 * Converts an object's keys to the project reading pattern
 * @param {object} obj
 * @param {function} func
 */

const normalizeData = (data: any | Array<any>, func: any): any => {
	if (isPlainObject(data)) {
		const n = {};

		Object.keys(data).forEach((k) => {
			const getValue = (data: any, k: string) => data[k];
			set(n, func(k), normalizeData(getValue(data, k), func));
		});

		return n;
	} else if (isArray(data)) {
		return data.map((i) => {
			return normalizeData(i, func);
		});
	}

	return data;
};

/**
 * Converts an object's keys to the client reading pattern
 */

export const normalizeToClient = (data: any | Array<any>) =>
	normalizeData(data, camelCase);

/**
 * Converts an object's keys to the server reading pattern
 */

export const normalizeToServer = (data: any | Array<any>) =>
	normalizeData(data, snakeCase);

export const deepKeys = (t: any, path: any = []): any => {
	if (Object(t) === t)
		return Object.entries(t).flatMap(([k, v]: any) =>
			deepKeys(v, [...path, k])
		);

	return [path.join('.')];
};

export const arrayToObject = (array: any, key: string) => {
	const initialValue = {};

	return array.reduce((obj: any, item: any) => {
		return {
			...obj,
			[item[key]]: item,
		};
	}, initialValue);
};
