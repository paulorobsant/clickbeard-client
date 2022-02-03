import React from 'react';
import { Redirect, Route, useParams } from 'react-router-dom';
import { getAccessToken } from '../../core/session';

type props = {
	exact: boolean;
	isAuthenticated?: boolean;
	layoutComponent: any;
	pageComponent: any;
	path: string;
	skipIfAuthenticated?: boolean;
};

const PublicRouter: React.FC<props> = ({
	layoutComponent: Layout,
	pageComponent: Page,
	exact = false,
	skipIfAuthenticated = false,
	...rest
}) => {
	const accessToken = getAccessToken();

	return (
		<Route
			{...rest}
			exact={exact}
			render={(matchProps) =>
				skipIfAuthenticated && accessToken ? (
					<Redirect
						to={{
							pathname: '/',
							state: { from: matchProps.location },
						}}
					/>
				) : (
					<Layout>
						<Page {...matchProps} useParams={useParams} />
					</Layout>
				)
			}
		/>
	);
};

export default PublicRouter;
