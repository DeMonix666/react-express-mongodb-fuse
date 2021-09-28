import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const UserConfig = {
	settings: {
		layout: {}
	},
	routes: [
		// {
		// 	path: '/user/detail',
		// 	component: lazy(() => import('./detail/Detail'))
		// },
		{
			path: '/user/list',
			component: lazy(() => import('./list/Users'))
		}
	]
};

export default UserConfig;
