import { combineReducers } from 'redux';
import baseReducer from './base/reducer';

const stateReducer = combineReducers({ baseReducer });

const rootReducer = (state: any, action: any) => {
	return stateReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
