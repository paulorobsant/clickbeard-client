import { LoginBody } from '../interfaces/login';
import { RegisterBody } from '../interfaces/register';
import API, { methods } from './api';

export const login = (body: LoginBody) =>
	API({
		method: methods.POST,
		url: '/login',
		data: body,
	});

export const register = (body: RegisterBody) =>
	API({
		method: methods.POST,
		url: '/register',
		data: body,
	});

export const getMe = () =>
	API({
		method: methods.GET,
		url: '/me',
	});

export const readAll = () =>
	API({
		method: methods.GET,
		url: '/all',
	});
