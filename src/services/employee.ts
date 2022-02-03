import { CreateEmployeeBody } from '../interfaces/employee';
import API, { methods } from './api';

export const getEmployeeByService = (id: string | number) =>
	API({
		method: methods.GET,
		url: `/employee/service/${id}`,
	});

export const getEmployees = () =>
	API({
		method: methods.GET,
		url: '/employee/read/all',
	});

export const createEmployee = (body: CreateEmployeeBody) =>
	API({
		method: methods.POST,
		url: '/employee/create',
		data: body,
	});
export const deleteEmployee = (id: string | number) =>
	API({
		method: methods.DELETE,
		url: `/employee/delete/${id}`,
	});
