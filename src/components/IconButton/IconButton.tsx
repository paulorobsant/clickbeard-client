import * as React from 'react';
import cls from 'classnames';
import { Button, IconName, MaybeElement } from '@blueprintjs/core';
import styles from './IconButton.module.css';

interface ButtonProps {
	className?: any;
	disabled?: boolean;
	icon?: IconName | MaybeElement;
	label?: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const IconButton = (props: ButtonProps) => {
	return (
		<Button
			icon={props.icon}
			className={cls(styles.Button, props.className)}
			onClick={props.onClick}
			disabled={props.disabled}
		></Button>
	);
};

export default IconButton;
