/* eslint-disable react/display-name */
import React from 'react';
import Table from '../../../../components/Table/Table';
import { get } from 'lodash';
import { Button, Intent } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';

const AdminSchedulesTable = ({
	data,
	onSelectedRows,
	clearSelectedRows,
	onRowClicked,
	onDelete,
}: any) => {
	const history = useHistory();
	const columns = [
		{
			cell: (row: any) => get(row, 'employee', ''),
			name: 'Colaborador',
			selector: 'employee',
			sortable: true,
		},
		{
			cell: (row: any) => get(row, 'customer', ''),
			name: 'Cliente',
			selector: 'customer',
			sortable: true,
		},
		{
			cell: (row: any) =>
				moment
					.tz(get(row, 'startDatetime', ''), 'America/Sao_Paulo')
					.format('DD/MM/YYYY HH:mm'),
			name: 'Data agendata',
			selector: 'startDatetime',
			sortable: true,
		},
	];

	return (
		<Table
			clearSelectedRows={clearSelectedRows}
			columns={columns}
			data={data}
			onSelectedRowsChange={onSelectedRows}
			onRowClicked={onRowClicked}
		/>
	);
};

export default AdminSchedulesTable;
