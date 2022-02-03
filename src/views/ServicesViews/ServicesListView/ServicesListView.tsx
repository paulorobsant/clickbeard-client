import * as React from 'react';
import { Intent } from '@blueprintjs/core';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';

import * as serviceAPI from '../../../services/service';
import { CreateServiceBody } from '../../../interfaces/service';
import { Alert } from '../../../components/Alert';
import { Service } from '../../../interfaces/service';
import ServicesTable from './components/ServicesTable';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const ServicesListView: React.FC = () => {
	const [services, setServices] = React.useState<Service[]>();
	const history = useHistory();

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

	const deleteService = (id: string) => {
		serviceAPI
			.deleteService(id)
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

				getServices();
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
		getServices();
	}, []);

	return (
		<div className="flex items-center justify-center py-24">
			<div className="w-3/4">
				<div className="flex mb-5">
					<p className="text-2xl font-bold mr-auto">Especialidades</p>
					<PrimaryButton
						label="Criar Especialidade"
						onClick={() => history.push('/services/form')}
					/>
				</div>

				<ServicesTable data={services} onDelete={deleteService} />
			</div>
		</div>
	);
};

export default ServicesListView;
