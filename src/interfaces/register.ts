import User from './user';

export interface RegisterBody extends User {
	password: string;
}
