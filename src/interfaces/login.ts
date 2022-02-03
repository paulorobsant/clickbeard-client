import User from './user';

export interface LoginBody extends User {
	email: string;
	password: string;
}
