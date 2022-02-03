import React from 'react';
import { DateInput, TimePrecision } from '@blueprintjs/datetime';
import { Intent, Position } from '@blueprintjs/core';
import moment from 'moment';

import FieldGroup, { FieldGroupProps } from '../FieldGroup';
import styles from './DateTimeField.module.css';

interface DateTimeFieldProps extends FieldGroupProps {
	defaultValue?: any;
	disabled?: boolean;
	fill?: boolean;
	intent?: Intent;
	large?: boolean;
	minDate?: any;
	name: string;
	onChange: (selectedDate: Date, isUserChange: boolean) => void;
	placeholder?: string;
	position?: Position;
	readOnly?: boolean;
	showTimeArrowButtons?: boolean;
	timePrecision?: TimePrecision;
	type?: string;
	value?: any;
}

const DateTimeField = (props: DateTimeFieldProps) => {
	const timePickerProps =
		props.timePrecision === undefined
			? undefined
			: {
					showArrowButtons: props.showTimeArrowButtons,
					precision: props.timePrecision,
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  };
	return (
		<FieldGroup {...props}>
			{() => (
				<DateInput
					onChange={props.onChange}
					popoverProps={{ position: props.position || Position.BOTTOM }}
					timePickerProps={timePickerProps}
					formatDate={(date) => moment(date).format('DD/MM/YYYY')}
					parseDate={(str) => new Date(str)}
					placeholder={props.placeholder}
					minDate={props.minDate}
					value={props.value}
					fill
					className={styles.DateTimeField}
				/>
			)}
		</FieldGroup>
	);
};

export default DateTimeField;
