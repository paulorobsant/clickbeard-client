import * as React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Intent } from '@blueprintjs/core';
import { get } from 'lodash';

import TextField from '../../../components/TextField';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import * as serviceAPI from '../../../services/service';
import { Button } from '@blueprintjs/core';
import {
	CreateServiceBody,
	UpdateServiceBody,
} from '../../../interfaces/service';
import { Alert } from '../../../components/Alert';
import IconButton from '../../../components/IconButton/IconButton';

const ServicesFormView: React.FC = () => {
	const history = useHistory();
	const { location } = history;

	const urlParams = new URLSearchParams(location.search);
	const id = urlParams.get('id') || '';

	const createService = (form: CreateServiceBody, actions: any) => {
		actions.setSubmitting(true);

		serviceAPI
			.createService({ ...form })
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

				history.push('/services');
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

		actions.setSubmitting(false);
	};

	const updateService = (form: UpdateServiceBody, actions: any) => {
		actions.setSubmitting(true);

		serviceAPI
			.updateService({ ...form, id })
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

				history.push('/services');
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

		actions.setSubmitting(false);
	};

	const getServiceById = () => {
		serviceAPI.getService(id).then((response) => {
			const data = get(response, 'data', []);
			formik.setFieldValue('name', data.name);
		});
	};

	const initialValues = {
		name: '',
	};

	const validationSchema = yup.object().shape({
		name: yup.string().required('Este é um campo obrigatório'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit: (form: any, actions: any) =>
			!id ? createService(form, actions) : updateService(form, actions),
		validationSchema,
	});

	React.useEffect(() => {
		if (id) {
			getServiceById();
		}
		return () => {};
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
					<p className="text-2xl font-bold">Crie uma especialidade</p>
				</div>
				<form noValidate className="w-full">
					<TextField
						required
						value={formik.values.name}
						onChange={({ target }: any) =>
							formik.setFieldValue('name', target.value)
						}
						label="Nome da Especialidade"
						name="name"
						error={formik.errors.name}
					/>
					<PrimaryButton
						label="Enviar"
						className="w-full"
						onClick={() => formik.handleSubmit()}
					/>
				</form>
			</div>
		</div>
	);
};

export default ServicesFormView;
