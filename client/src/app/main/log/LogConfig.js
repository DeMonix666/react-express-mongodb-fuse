import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const LogConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/log/list',
			component: lazy(() => import('./list/Logs'))
		}
	]
};

export default LogConfig;
