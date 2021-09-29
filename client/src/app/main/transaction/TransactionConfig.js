import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const TransactionConfig  = {
	settings: {
		layout: {}
	},
	routes: [		
		{
			path: '/transaction/list',
			component: lazy(() => import('./list/Transactions'))
		}
	]
};

export default TransactionConfig;
