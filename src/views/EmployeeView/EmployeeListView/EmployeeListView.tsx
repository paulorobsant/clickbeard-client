import * as React from 'react';
import { Intent } from '@blueprintjs/core';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';

import * as employeeAPI from '../../../services/employee';
import { CreateServiceBody } from '../../../interfaces/service';
import { Alert } from '../../../components/Alert';
import { Service } from '../../../interfaces/service';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import EmployeeTable from './components/EmployeeTable';

const EmployeeListView: React.FC = () => {
	const [employees, setEmployees] = React.useState<Service[]>();
	const history = useHistory();

	const getEmployees = () => {
		employeeAPI
			.getEmployees()
			.then((res) => {
				const data = get(res, 'data', null);
				setEmployees(data);
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

	React.useEffect(() => {
		getEmployees();
	}, []);

	return (
		<div className="flex items-center justify-center py-24">
			<div className="w-3/4">
				<div className="flex mb-5">
					<p className="text-2xl font-bold mr-auto">Colaboradores</p>
					<PrimaryButton
						label="Registrar Colaborador"
						onClick={() => history.push('/employee/form')}
					/>
				</div>

				<EmployeeTable data={employees} />
			</div>
		</div>
	);
};

export default EmployeeListView;
