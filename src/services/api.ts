import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken } from '../core/session';
import { normalizeToClient, normalizeToServer } from '../utils/data';

const baseAPI = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

export const methods = {
	DELETE: 'DELETE',
	GET: 'GET',
	PATCH: 'PATCH',
	POST: 'POST',
	PUT: 'PUT',
} as any;

baseAPI.interceptors.response.use(
	function (response: any): AxiosResponse<any> {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return normalizeToClient(response) as any;
	},
	function (error: object): AxiosResponse<any> {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error) as any;
	}
);

interface IHeaderAPI {
	Authorization?: string | undefined;
}

interface IAPI extends AxiosRequestConfig {
	headers?: IHeaderAPI | object | undefined;
	queries?: object | undefined;
}

const API = ({
	url,
	method,
	data,
	headers = {},
	queries = {},
	...rest
}: IAPI) => {
	const accessToken = getAccessToken();
	const mixinHeaders = { ...headers };
	const mixinQueries = { ...queries };

	if (accessToken) {
		mixinHeaders.Authorization = `Bearer ${accessToken}`;
	}

	return baseAPI({
		// data: normalizeToServer(data),
		data,
		headers: mixinHeaders,
		method,
		params: normalizeToServer(mixinQueries),
		url,
		...rest,
	});
};

export default API;
