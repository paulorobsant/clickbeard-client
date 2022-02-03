import React from 'react';
// import { useTranslation } from 'react-i18next';
import { FormGroup, Intent } from '@blueprintjs/core';
import { isEmpty } from 'lodash';

export interface FieldProps {
	disabled?: boolean;
	intent?: Intent;
	large?: boolean;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	readOnly?: boolean;
	type?: string;
	value: any;
}

export interface FieldGroupProps {
	children?: any;
	disabled?: boolean;
	error?: string;
	intent?: Intent;
	label?: string;
	name: string;
	required?: boolean;
	touched?: boolean;
}

const FieldGroup = ({
	children,
	disabled = false,
	required = false,
	intent = undefined,
	label,
	name,
	touched = false,
	error = '',
}: FieldGroupProps) => {
	// const [t] = useTranslation();

	const helperText = !isEmpty(error) && touched && error;
	const intentText = !isEmpty(error) && touched ? 'danger' : intent;

	return (
		<FormGroup
			disabled={disabled}
			helperText={helperText}
			intent={intentText}
			label={label}
			labelFor={name}
			// labelInfo={required && `(${t('required')})`}
		>
			{children({ intent: intentText })}
		</FormGroup>
	);
};

export default FieldGroup;
