import { put, call, all } from 'redux-saga/effects';
import { actions } from '../../store/ducks/auth';
import * as authAPI from '../../services/auth';

import { get } from 'lodash';

export function* getUserInformation() {
	try {
		const { user: userData } = yield all({ user: call(authAPI.getMe) });

		const user = get(userData, 'data');

		yield put(actions.setUserLoginInformationSuccess({ user }));
	} catch (error) {
		yield put(actions.setUserLoginInformationFailed([]));
	}
}
