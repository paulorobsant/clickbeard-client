import { takeEvery, takeLatest, all } from 'redux-saga/effects';
import { types as authTypes } from '../../store/ducks/auth';
import { getUserInformation } from '../../store/sagas/auth';

export default function* root() {
	yield all([takeLatest(authTypes.USER_LOGIN_INFORMATION, getUserInformation)]);
	yield takeEvery([authTypes.USER_LOGIN], getUserInformation);
}
