import User from './user';

export interface Employee {
	id?: string | number;
	user?: User;
	userId: string;
}

export interface CreateEmployeeBody extends Employee {
	servicesIds: Array<number | string>
}
