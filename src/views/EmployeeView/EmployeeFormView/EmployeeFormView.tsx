import * as React from 'react';
import { Intent, Checkbox } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import { get, includes, filter } from 'lodash';

import * as serviceAPI from '../../../services/service';
import * as employeeAPI from '../../../services/employee';
import * as authAPI from '../../../services/auth';
import { Alert } from '../../../components/Alert';
import { Service } from '../../../interfaces/service';
import User from '../../../interfaces/user';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import IconButton from '../../../components/IconButton/IconButton';
import UserSuggest from './components/UserSuggest';

const EmployeeFormView: React.FC = () => {
	const [services, setServices] = React.useState<Service[]>();
	const [users, setUsers] = React.useState<User[]>();

	const [selectedUser, setSelectedUser] = React.useState<any>();
    const [selectedServices, setSelectedServices] = React.useState([] as any);
    
    const history = useHistory();

	const createEmployee = () => {
		employeeAPI
			.createEmployee({ userId: selectedUser, servicesIds: selectedServices })
			.then((res) => {
				res.data.messages?.map((message: any) =>
					Alert.show({
						intent: Intent.SUCCESS,
						message: (
							<>
								<p>{message}</p>
							</>
						),
					})
				);

				history.push('/employee');
			})
			.catch((error) => {
				const response = get(error, 'response', null);

				response.data.messages?.map((message: any) =>
					Alert.show({
						intent: Intent.DANGER,
						message: (
							<>
								<p>{message}</p>
							</>
						),
					})
				);
			});
	};

	const getServices = () => {
		serviceAPI
			.getServices()
			.then((res) => {
				const data = get(res, 'data', null);
				setServices(data);
			})
			.catch((error) => {
				const response = get(error, 'response', null);

				response.data.messages?.map((message: any) =>
					Alert.show({
						intent: Intent.DANGER,
						message: (
							<>
								<p>{message}</p>
							</>
						),
					})
				);
			});
	};

	const getUsers = () => {
		authAPI
			.readAll()
			.then((res) => {
				const data = get(res, 'data', null);
				setUsers(data);
			})
			.catch((error) => {
				const response = get(error, 'response', null);

				response.data.messages?.map((message: any) =>
					Alert.show({
						intent: Intent.DANGER,
						message: (
							<>
								<p>{message}</p>
							</>
						),
					})
				);
			});
	};

	const handleSelectService = (id: string | number) => {
		if (includes(selectedServices, id)) {
			const newSelectedServices = filter(
				selectedServices,
				(item) => item !== id
			);
			setSelectedServices(newSelectedServices);
		} else {
			setSelectedServices([...selectedServices, id]);
		}
	};

	React.useEffect(() => {
		getServices();
		getUsers();
	}, []);

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="w-1/2">
				<div className="flex">
					<IconButton
						icon="arrow-left"
						className="mr-5"
						onClick={() => history.goBack()}
					></IconButton>
					<p className="text-2xl font-bold">Registrar um colaborador</p>
				</div>
				<form noValidate className="w-full">
					<div className="my-5">
						<UserSuggest
							onChange={(value: any) => setSelectedUser(value.id)}
							label="Escolha um usuario"
							items={users}
						/>
					</div>
					<div>
						<p className="font-bold mb-2">Especialidades</p>
						{services?.map((item: any, idx: any) => (
							<Checkbox
								key={idx}
								label={item.name}
								checked={includes(selectedServices, item.id)}
								onChange={() => handleSelectService(item.id)}
							/>
						))}
					</div>

					<PrimaryButton
						label="Enviar"
						className="w-full"
						onClick={() => createEmployee()}
						disabled={!selectedUser && !selectedServices.legth}
					/>
				</form>
			</div>
		</div>
	);
};

export default EmployeeFormView;
