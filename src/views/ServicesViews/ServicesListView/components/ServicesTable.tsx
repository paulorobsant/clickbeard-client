/* eslint-disable react/display-name */
import React from 'react';
import Table from '../../../../components/Table/Table';
import { get } from 'lodash';
import { Button, Intent } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';

const ServicesTable = ({
	data,
	onSelectedRows,
	clearSelectedRows,
	onRowClicked,
	onDelete,
}: any) => {
	const history = useHistory();
	const columns = [
		{
			cell: (row: any) => get(row, 'name', ''),
			name: 'Nome',
			selector: 'name',
			sortable: true,
		},
		{
			cell: (row: any) => (
				<>
					<Button
						icon="edit"
						style={{ marginLeft: 10 }}
						intent={Intent.PRIMARY}
						onClick={() => history.push(`/services/form/?id=${row.id}`)}
					></Button>
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

export default ServicesTable;
