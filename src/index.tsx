import './index.css';
import 'pure-react-carousel/dist/react-carousel.es.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import './i18n';
import AppRouter from './routes';

ReactDOM.render(
	<>
		<Suspense fallback={<></>}>
			<Provider store={store}>
				<AppRouter />
			</Provider>
		</Suspense>
	</>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
