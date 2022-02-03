import moment, { MomentInput } from 'moment';

export const mustLogout = (lastAuth: MomentInput | string) => {
	const diffAuthSync = moment().diff(lastAuth, 'hours');
	return diffAuthSync >= 24;
};
