export interface Service {
	id?: string | number;
	name: string;
}

export interface CreateServiceBody extends Service {}

export interface UpdateServiceBody extends CreateServiceBody {
	id: string;
}
