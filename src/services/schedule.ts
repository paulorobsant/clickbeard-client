import {
	CreateScheduleBody,
	GetScheduleByEmployee,
} from '../interfaces/schedule';
import API, { methods } from './api';

export const getScheduleByEmployee = (body: GetScheduleByEmployee) =>
	API({
		method: methods.POST,
		url: '/schedule/employee',
		data: body,
	});

export const getSchedules = () =>
	API({
		method: methods.GET,
		url: '/schedule/read/all',
	});

export const getSchedulesByEmployee = () =>
	API({
		method: methods.GET,
		url: `/schedule/employee`,
	});

export const getSchedulesByCustomer = () =>
	API({
		method: methods.GET,
		url: `/schedule/customer`,
	});

export const createSchedule = (body: CreateScheduleBody) =>
	API({
		method: methods.POST,
		url: '/schedule/create',
		data: body,
	});

export const deleteSchedule = (id: string | number) =>
	API({
		method: methods.DELETE,
		url: `/schedule/delete/${id}`,
	});
