import * as React from 'react';
import { useSelector } from 'react-redux';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import CustomerDashboard from './CustomerDashboard/CustomerDashboard';
import EmployeeDashboard from './EmployeeDashboard/EmployeeDashboard';

const DashboardView = () => {
	const { user } = useSelector((state: any) => state.auth);

	return (
		<>
			{user.isAdmin == true && <AdminDashboard />}
			{user.isEmployee == true && <EmployeeDashboard />}
			{!user.isAdmin && !user.isEmployee && <CustomerDashboard />}
		</>
	);
};

export default DashboardView;
