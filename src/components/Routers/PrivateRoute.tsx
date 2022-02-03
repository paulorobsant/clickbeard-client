import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getAccessToken } from '../../core/session';

type props = {
	exact: boolean;
	isAuthenticated?: boolean;
	layoutComponent: any;
	pageComponent: any;
	path: string;
};

const PrivateRouter: React.FC<props> = ({
	layoutComponent: Layout,
	pageComponent: Page,
	exact = false,
	...rest
}) => {
	return (
		<Route
			{...rest}
			exact={exact}
			render={(props) =>
				getAccessToken() ? (
					<Layout>
						<Page {...props} />
					</Layout>
				) : (
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

export default PrivateRouter;
