import * as React from 'react';
import cls from 'classnames';
import { Button, IconName, MaybeElement } from '@blueprintjs/core';
import styles from './PrimaryButton.module.css';
import { get } from 'lodash';

interface ButtonProps {
	className?: any;
	disabled?: boolean;
	icon?: IconName | MaybeElement;
	label?: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	type?: any;
}

const PrimaryButton = (props: ButtonProps) => {
	return (
		<Button
			icon={props.icon}
			className={cls(styles.Button, props.className)}
			onClick={props.onClick}
			disabled={props.disabled}
			// type={get(props, 'type', 'button')}
		>
			{props.label}
		</Button>
	);
};

export default PrimaryButton;
