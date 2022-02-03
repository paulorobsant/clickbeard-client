import React from 'react';
import DataTable from 'react-data-table-component';
import styles from './Table.module.css';

const customStyles = {
	table: {
		style: {
			backgroundColor: 'transparent',
		},
	},
	cells: {
		style: {
			fontSize: '14px',
			paddingLeft: '20px',
			// override the cell padding for data cells
			paddingRight: '20px',
			backgroundColor: 'none',
		},
	},
	headRow: {
		style: {
			borderRadius: '10px',
			backgroundColor: '#3B82F6',
			boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.15)',
			marginBottom: '5px',
		},
	},
	headCells: {
		style: {
			color: '#fff',
			fontSize: '14px',
			paddingLeft: '20px',
			// override the cell padding for head cells
			paddingRight: '20px',
		},
	},
	rows: {
		style: {
			// override the row height
			minHeight: '60px',
			borderRadius: '10px',
			marginBottom: '5px',
			boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.15)',
			color: '#2b2846',
			'&:hover': {
				backgroundColor: '#EAEFF0',
				cursor: 'pointer',
			},
		},
	},
	pagination: {
		style: {
			minHeight: '40px',
			borderRadius: '10px',
			boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.15)',
		},
	},
};

const Table = (props: any) => (
	<div className={styles.Container}>
		<DataTable {...props} customStyles={customStyles} pagination />
	</div>
);

export default Table;
