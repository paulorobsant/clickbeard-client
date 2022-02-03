import { Position, Toaster } from '@blueprintjs/core';

/** Singleton toaster instance. Create separate instances for different options. */
export const Alert = Toaster.create({
	className: 'recipe-toaster',
	position: Position.TOP_RIGHT,
});
