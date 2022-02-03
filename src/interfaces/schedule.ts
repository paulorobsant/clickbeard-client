export interface Schedule {
	customerId: string | number;
	employeeId: string | number;
	endDatetime?: string;
	id?: string | number;
	startDatetime: string;
}

export interface CreateScheduleBody extends Schedule {}

export interface GetScheduleByEmployee {
	date: string;
	employeeId: string | number;
}
