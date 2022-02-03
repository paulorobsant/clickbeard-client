import * as React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { Intent } from '@blueprintjs/core';
import { get } from 'lodash';

import TextField from '../../components/TextField';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import * as authAPI from '../../services/auth';
import { RegisterBody } from '../../interfaces/register';
import { Alert } from '../../components/Alert';

const RegisterView: React.FC = () => {
	const history = useHistory();

	const register = (form: RegisterBody, actions: any) => {
		actions.setSubmitting(true);

		authAPI
			.register({ ...form })
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

				history.push('/login');
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

	const initialValues = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const validationSchema = yup.object().shape({
		name: yup.string().required('Este é um campo obrigatório'),
		email: yup.string().required('Este é um campo obrigatório'),
		password: yup.string().required('Este é um campo obrigatório'),
		confirmPassword: yup
			.string()
			.required('Este é um campo obrigatório')
			.oneOf([yup.ref('password')], 'As senhas devem ser iguais.'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit: (form: any, actions: any) => register(form, actions),
		validationSchema,
	});

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="shadow-2xl p-10 bg-white rounded-lg w-1/2">
				<p className="text-2xl font-bold">Crie sua conta</p>

				<form noValidate className="w-full">
					<TextField
						required
						value={formik.values.name}
						onChange={({ target }: any) =>
							formik.setFieldValue('name', target.value)
						}
						label="Nome"
						name="name"
						error={formik.errors.name}
					/>
					<TextField
						required
						value={formik.values.email}
						onChange={({ target }: any) =>
							formik.setFieldValue('email', target.value)
						}
						label="Email"
						name="email"
						error={formik.errors.email}
					/>
					<TextField
						type="password"
						required
						value={formik.values.password}
						onChange={({ target }: any) =>
							formik.setFieldValue('password', target.value)
						}
						label="Senha"
						name="password"
						error={formik.errors.password}
					/>
					<TextField
						type="password"
						required
						value={formik.values.confirmPassword}
						onChange={({ target }: any) =>
							formik.setFieldValue('confirmPassword', target.value)
						}
						label="Confirme sua senha"
						name="confirmPassword"
						error={formik.errors.confirmPassword}
					/>
					<PrimaryButton
						label="Enviar"
						className="w-full"
						onClick={() => formik.handleSubmit()}
					/>
					<p className="mt-5 mb-0 text-center font-bold">
						<Link to="/login">Já possui conta?</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default RegisterView;
