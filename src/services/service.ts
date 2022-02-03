import { CreateServiceBody, UpdateServiceBody } from '../interfaces/service';
import API, { methods } from './api';

export const getService = (id: string | number) =>
	API({
		method: methods.GET,
		url: `/service/read/${id}`,
	});

export const getServices = () =>
	API({
		method: methods.GET,
		url: '/service/read/all',
	});

export const createService = (body: CreateServiceBody) =>
	API({
		method: methods.POST,
		url: '/service/create',
		data: body,
	});

export const updateService = (body: UpdateServiceBody) =>
	API({
		method: methods.PATCH,
		url: '/service/update',
		data: body,
	});

export const deleteService = (id: string | number) =>
	API({
		method: methods.DELETE,
		url: `/service/delete/${id}`,
	});
