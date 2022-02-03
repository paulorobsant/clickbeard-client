import React from 'react';
import cx from 'classnames';
import { Icon } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions as authActions } from '../../../store/ducks/auth';
import storage from 'redux-persist/lib/storage';
import { get } from 'lodash';

const PanelLayout: React.FC = ({ children }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { location } = history;
	const { user } = useSelector((state: any) => state.auth);

	const doLogout = () => {
		dispatch(authActions.setUserLogout());
		storage.removeItem('accessToken');
		history.push('/login');
	};

	return (
		<div className="flex">
			<div className="h-screen w-1/5 bg-gray-100 p-5 shadow-2xl">
				<div className="p-5 flex items-center">
					<Icon icon="user" size={20} />
					<div className="mx-5">
						<p className=" font-bold text-lg">
							{user.name && user.name.split(' ')[0]}
						</p>

						<p className="text-sm">
							{user.isAdmin == true && 'Admin'}
							{user.isEmployee == true && 'Colaborador'}
							{!user.isAdmin && !user.isEmployee && 'Cliente'}
						</p>
					</div>
				</div>
				<ul className="">
					<li
						onClick={() => history.push('/')}
						className={cx(
							'p-5 hover:bg-blue-600 hover:text-white rounded-md cursor-pointer',
							{
								'font-bold text-blue-600':
									location.pathname.split('/')[1] === '',
							}
						)}
					>
						Iniciar
					</li>
					<li
						onClick={() => history.push('/schedule')}
						className={cx(
							'p-5 hover:bg-blue-600 hover:text-white rounded-md cursor-pointer',
							{
								'font-bold text-blue-600':
									location.pathname.split('/')[1] == 'schedule',
							}
						)}
					>
						Agendamento
					</li>
					{user.isAdmin == true && (
						<>
							<li
								onClick={() => history.push('/employee')}
								className={cx(
									'p-5 hover:bg-blue-600 hover:text-white rounded-md cursor-pointer',
									{
										'font-bold text-blue-600':
											location.pathname.split('/')[1] == 'employee',
									}
								)}
							>
								Colaboradores
							</li>
							<li
								onClick={() => history.push('/services')}
								className={cx(
									'p-5 hover:bg-blue-600 hover:text-white rounded-md cursor-pointer',
									{
										'font-bold text-blue-600':
											location.pathname.split('/')[1] == 'services',
									}
								)}
							>
								Especialidades
							</li>
						</>
					)}
					<li
						className={cx(
							'p-5 hover:bg-blue-600 hover:text-white rounded-md cursor-pointer'
						)}
						onClick={() => doLogout()}
					>
						Sair
					</li>
				</ul>
			</div>
			<div className="h-screen overflow-y-auto w-4/5">{children}</div>
		</div>
	);
};

export default PanelLayout;
