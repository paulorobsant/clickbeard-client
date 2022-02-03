/* eslint-disable react/display-name */
import React from 'react';
import Table from '../../../../components/Table/Table';
import { get } from 'lodash';

const EmployeeTable = ({
	data,
	onSelectedRows,
	clearSelectedRows,
	onRowClicked,
}: any) => {
	const columns = [
		{
			cell: (row: any) => get(row, 'user.name', ''),
			name: 'Nome',
			selector: 'name',
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

export default EmployeeTable;
