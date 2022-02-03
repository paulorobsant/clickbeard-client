import { get } from 'lodash';
import { getCurrentTime } from '../../utils/time';
import { IAction } from '../actions';

// Types

export const types = {
	USER_LOGIN: 'app/auth/USER_LOGIN',
	USER_LOGIN_INFORMATION: 'app/auth/USER_LOGIN_INFORMATION',
	USER_RESET_INFORMATION: 'app/auth/USER_RESET_INFORMATION',
	USER_LOGIN_INFORMATION_FAILED: 'app/auth/USER_LOGIN_INFORMATION_FAILED',
	USER_LOGIN_INFORMATION_SUCCESS: 'app/auth/USER_LOGIN_INFORMATION_SUCCESS',
	USER_LOGOUT: 'app/auth/USER_LOGOUT',
	USER_ROLES: 'app/auth/USER_ROLES',
	USER_ACTIVE_ROLE: 'app/auth/USER_ACTIVE_ROLE',
};

// Actions

export const actions = {
	setLoginUser: (data: any): IAction => ({
		payload: data,
		type: types.USER_LOGIN,
	}),
	setUserLoginInformation: (): IAction => ({
		type: types.USER_LOGIN_INFORMATION,
	}),
	setUserLoginInformationFailed: (data: any): IAction => ({
		payload: data,
		type: types.USER_LOGIN_INFORMATION_FAILED,
	}),
	setUserLoginInformationSuccess: (data: any): IAction => ({
		payload: data,
		type: types.USER_LOGIN_INFORMATION_SUCCESS,
	}),
	setUserLogout: (): IAction => ({
		type: types.USER_LOGOUT,
	}),
};

// Reducers

const INITIAL_STATE = {
	isAuthenticated: false,
	lastAuth: null,
	user: {
		name: null,
		email: null,
		isAdmin: false,
		isEmployee: false,
	},
};

const authReducer = (state = INITIAL_STATE, action: IAction) => {
	switch (action.type) {
		case types.USER_LOGIN_INFORMATION:
			return state;
		case types.USER_LOGIN:
			return {
				...state,
				isAuthenticated: true,
				lastAuth: getCurrentTime(),
			};
		case types.USER_LOGIN_INFORMATION_SUCCESS:
			return {
				...state,
				user: {
					id: get(action, 'payload.user.id'),
					name: get(action, 'payload.user.name'),
					email: get(action, 'payload.user.email'),
					isAdmin: get(action, 'payload.user.isAdmin'),
					isEmployee: get(action, 'payload.user.isEmployee'),
				},
			};
		case types.USER_LOGIN_INFORMATION_FAILED:
			return state;
		case types.USER_LOGOUT:
			return {
				...state,
				...INITIAL_STATE,
			};
		default:
			return state;
	}
};

export default authReducer;
