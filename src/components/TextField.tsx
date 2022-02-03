import * as React from 'react';
import { isEmpty } from 'lodash';
import cx from 'classnames';

interface FieldProps {
	disabled?: boolean;
	error: any;
	label: string;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	readOnly?: boolean;
	required?: boolean;
	type?: string;
	value: any;
}

const TextField = (props: FieldProps) => {
	const errorMessage = !isEmpty(props.error) && props.error;

	return (
		<div className="mt-5 mb-5">
			<label className="font-bold block mb-2">{props.label}</label>
			<input
				type={props.type || 'text'}
				value={props.value}
				onChange={props.onChange}
				name={props.name}
				required={props.required}
				readOnly={props.readOnly}
				placeholder={props.placeholder}
				disabled={props.disabled}
				className={cx('rounded text-sm w-full border p-2', {
					'border-gray-300': !props.error,
					'border-red-300': props.error,
				})}
			/>

			<p className="text-xs text-red-500 mt-2">{errorMessage}</p>
		</div>
	);
};

export default TextField;
