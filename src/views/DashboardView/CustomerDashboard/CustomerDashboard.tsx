import * as React from 'react';
import * as scheduleAPI from '../../../services/schedule';
import { Alert } from '../../../components/Alert';
import CustomerSchedulesTable from './components/CustomerSchedulesTable';

import { get } from 'lodash';
import { Intent } from '@blueprintjs/core';
import { useSelector } from 'react-redux';

const CustomerDashboard: React.FC = () => {
	const [schedules, setSchedules] = React.useState([] as any);
	const { user } = useSelector((state: any) => state.auth);

	const getSchedules = () => {
		scheduleAPI
			.getSchedulesByCustomer()
			.then((res) => {
				const data = get(res, 'data', null);
				setSchedules(data);
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

	const deleteSchedule = (id: string) => {
		scheduleAPI
			.deleteSchedule(id)
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

				getSchedules();
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
		getSchedules();
	}, []);

	return (
		<div className="flex items-center justify-center py-24">
			<div className="w-3/4">
				<p className="text-2xl font-bold mb-5">Meus agendamentos</p>
				<CustomerSchedulesTable data={schedules} onDelete={deleteSchedule} />
			</div>
		</div>
	);
};

export default CustomerDashboard;
