import * as React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Intent } from '@blueprintjs/core';
import { get } from 'lodash';

import TextField from '../../components/TextField';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import * as authAPI from '../../services/auth';
import { LoginBody } from '../../interfaces/login';
import { Alert } from '../../components/Alert';
import { actions as authActions } from '../../store/ducks/auth';
import storage from 'redux-persist/lib/storage';

const LoginView: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const login = (form: LoginBody, actions: any) => {
		actions.setSubmitting(true);

		authAPI
			.login({ ...form })
			.then((res) => {
				storage.setItem('accessToken', res.data.data.token);
				dispatch(authActions.setLoginUser(res.data.data));

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

		actions.setSubmitting(false);
	};

	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = yup.object().shape({
		email: yup.string().required('Este é um campo obrigatório'),
		password: yup.string().required('Este é um campo obrigatório'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit: (form: any, actions: any) => login(form, actions),
		validationSchema,
	});

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="shadow-2xl p-10 bg-white rounded-lg w-1/2">
				<p className="text-2xl font-bold">Login</p>
				<form noValidate className="w-full">
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
					<PrimaryButton
						label="Acessar"
						className="w-full"
						onClick={() => formik.handleSubmit()}
					/>
					<p className="mt-5 mb-0 text-center font-bold">
						<Link to="/register">Não possui conta?</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default LoginView;
