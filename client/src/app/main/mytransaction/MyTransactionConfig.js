import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const MyTransactionConfig  = {
	settings: {
		layout: {}
	},
	routes: [		
		{
			path: '/mytransaction/list',
			component: lazy(() => import('./list/MyTransactions'))
		}
	]
};

export default MyTransactionConfig;
