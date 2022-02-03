import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { Action } from 'react-data-table-component/dist/src/DataTable/types';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({});
const persistConfig = {
	key: 'root',
	storage,
};

const persistReducers = persistReducer(persistConfig, rootReducer);

const store = createStore(
	persistReducers,
	composeEnhancers(applyMiddleware(thunk), applyMiddleware(sagaMiddleware))
);

const persistor = persistStore(store);
sagaMiddleware.run(rootSagas);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export { store, persistor };
