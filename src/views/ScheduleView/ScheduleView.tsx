import * as React from 'react';
import { Employee } from '../../interfaces/employee';
import { Schedule } from '../../interfaces/schedule';
import { Service } from '../../interfaces/service';
import * as EmployeeAPI from '../../services/employee';
import * as ServiceAPI from '../../services/service';
import * as ScheduleAPI from '../../services/schedule';
import DateTimeField from '../../components/DateTimeField/DateTimeField';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { Alert } from '../../components/Alert';

import moment from 'moment';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Intent } from '@blueprintjs/core';

const ScheduleView: React.FC = () => {
	const [services, setServices] = React.useState<Service[]>();
	const [employees, setEmployees] = React.useState<Employee[]>();
	const [schedules, setSchedules] = React.useState<Schedule[]>();
	const [selectedSchedule, setSelectedSchedule] = React.useState<any>();
	const [selectedDate, setSelectedDate] = React.useState<any>();
	const [selectedServiceId, setSelectedServiceId] = React.useState<string>();
	const [selectedEmployeeId, setSelectedEmployeeId] = React.useState<any>();

	const history = useHistory();
	const { user } = useSelector((state: any) => state.auth);

	const getAllServices = () => {
		ServiceAPI.getServices().then(({ data }) => {
			setServices(data);
			setSelectedServiceId(get(data[0], 'id', ''));
		});
	};

	const getAllEmployeesByService = (serviceId: string | number) => {
		EmployeeAPI.getEmployeeByService(serviceId).then(({ data }) => {
			setEmployees(data);
			setSelectedEmployeeId(get(data[0], 'employeeId', ''));
		});
	};

	const getScheduleByEmployee = (employeeId: number | string, date: string) => {
		ScheduleAPI.getScheduleByEmployee({
			employeeId,
			date: moment(date).format('YYYY-MM-DD'),
		}).then(({ data }) => {
			setSchedules(data);
			setSelectedSchedule(data[0]);
		});
	};

	const createSchedule = () => {
		ScheduleAPI.createSchedule({
			customerId: user.id,
			employeeId: selectedEmployeeId,
			startDatetime: `${moment(selectedDate).format('YYYY-MM-DD')} ${moment(
				selectedSchedule
			).format('HH:mm:ss')}`,
		})
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

				history.push('/');
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
		getAllServices();
	}, []);

	React.useEffect(() => {
		if (selectedServiceId) getAllEmployeesByService(selectedServiceId);
	}, [selectedServiceId]);

	React.useEffect(() => {
		if (selectedEmployeeId && selectedDate)
			getScheduleByEmployee(selectedEmployeeId, selectedDate);
	}, [selectedDate, selectedEmployeeId]);

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="p-10 bg-white w-1/2">
				<p className="text-2xl font-bold mb-5">Agende um horário</p>
				<div className="pb-4">
					<label className="font-bold mb-2 block">Serviço</label>
					<select
						className="border-gray-300 rounded text-sm w-full border-2 p-2"
						onChange={({ target }) => setSelectedServiceId(target.value)}
					>
						{services?.map((item: Service) => (
							<option key={item.id} value={item.id}>
								{item.name}
							</option>
						))}
					</select>
				</div>
				<div className="pb-4">
					<label className="font-bold mb-2 block">Funcionário</label>
					<select
						className="border-gray-300 rounded text-sm w-full border-2 p-2"
						onChange={({ target }) => setSelectedEmployeeId(target.value)}
					>
						{employees?.map((item: any) => (
							<option key={item.employeeId} value={item.employeeId}>
								{item.name}
							</option>
						))}
					</select>
				</div>
				<div className="pb-4">
					<label className="font-bold mb-2 block">Escolha uma data</label>
					<DateTimeField
						onChange={(date) => setSelectedDate(date)}
						placeholder="Selecione uma data"
						name="scheduleDate"
						value={selectedDate}
						minDate={new Date()}
					/>
				</div>

				<div className="pb-4">
					<label className="font-bold mb-2 block">Horários disponíveis</label>
					<select
						className="border-gray-300 rounded text-sm w-full border-2 p-2"
						onChange={({ target }) => setSelectedSchedule(target.value)}
					>
						{schedules?.map((item: any, idx: any) => (
							<option key={idx} value={item}>
								{moment(item).format('H:mm')}
							</option>
						))}
					</select>
				</div>
				<PrimaryButton
					label="Enviar"
					className="w-full"
					onClick={() => createSchedule()}
					disabled={
						selectedDate &&
						selectedEmployeeId &&
						selectedSchedule &&
						selectedServiceId
							? false
							: true
					}
				/>
			</div>
		</div>
	);
};

export default ScheduleView;
