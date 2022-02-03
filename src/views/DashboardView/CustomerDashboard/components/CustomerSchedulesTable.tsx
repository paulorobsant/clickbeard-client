/* eslint-disable react/display-name */
import React from 'react';
import Table from '../../../../components/Table/Table';
import { get } from 'lodash';
import { Button, Intent } from '@blueprintjs/core';
import moment from 'moment-timezone';

const CustomerSchedulesTable = ({
	data,
	onSelectedRows,
	clearSelectedRows,
	onRowClicked,
	onDelete,
}: any) => {
	const columns = [
		{
			cell: (row: any) => get(row, 'employee', ''),
			name: 'Barbeiro',
			selector: 'employee',
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
		{
			cell: (row: any) => (
				<>
					<Button
						icon="trash"
						style={{ marginLeft: 10 }}
						intent={Intent.DANGER}
						onClick={() => onDelete(row.id)}
					></Button>
				</>
			),
			name: 'Ações',
			selector: 'actions',
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

export default CustomerSchedulesTable;
