import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import ScheduleView from '../views/ScheduleView/ScheduleView';
import NotFound from '../views/NotFound/NotFound';
import LoginView from '../views/LoginView/LoginView';
import RegisterView from '../views/RegisterView/RegisterView';
import ServicesFormView from '../views/ServicesViews/ServicesFormView/ServicesFormView';
import ServicesListView from '../views/ServicesViews/ServicesListView/ServicesListView';
import PrivateRoute from '../components/Routers/PrivateRoute';
import DashboardView from '../views/DashboardView/DashboardView';
import PublicRouter from '../components/Routers/PublicRoute';
import AuthLayout from '../components/Layouts/AuthLayout/AuthLayout';
import PanelLayout from '../components/Layouts/PanelLayout/PanelLayout';
import EmployeeListView from '../views/EmployeeView/EmployeeListView/EmployeeListView';
import EmployeeFormView from '../views/EmployeeView/EmployeeFormView/EmployeeFormView';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute
					pageComponent={DashboardView}
					path="/"
					exact
					layoutComponent={PanelLayout}
				/>
				<PublicRouter
					skipIfAuthenticated
					pageComponent={RegisterView}
					path="/register"
					exact
					layoutComponent={AuthLayout}
				/>
				<PublicRouter
					skipIfAuthenticated
					pageComponent={LoginView}
					path="/login"
					exact
					layoutComponent={AuthLayout}
				/>
				<PublicRouter
					pageComponent={NotFound}
					path="/not-found"
					exact={false}
					layoutComponent={AuthLayout}
				/>

				<PrivateRoute
					pageComponent={ServicesFormView}
					path="/services/form"
					exact
					layoutComponent={PanelLayout}
				/>
				<PrivateRoute
					pageComponent={ServicesListView}
					path="/services"
					exact
					layoutComponent={PanelLayout}
				/>
				<PrivateRoute
					pageComponent={ScheduleView}
					path="/schedule"
					exact
					layoutComponent={PanelLayout}
				/>

				<PrivateRoute
					pageComponent={EmployeeFormView}
					path="/employee/form"
					exact
					layoutComponent={PanelLayout}
				/>

				<PrivateRoute
					pageComponent={EmployeeListView}
					path="/employee"
					exact
					layoutComponent={PanelLayout}
				/>

				<Redirect from="*" to="/not-found" />
			</Switch>
		</BrowserRouter>
	);
};

export default AppRouter;
