import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ItemConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/item/list/:itemId/:itemHandle?',
			component: lazy(() => import('./item/Item'))
		},
		{
			path: '/item/list',
			component: lazy(() => import('./list/Items'))
		}
	]
};

export default ItemConfig;
