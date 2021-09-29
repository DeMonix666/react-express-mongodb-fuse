const navigationConfig = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		type: 'item',
		icon: 'whatshot',
		url: '/dashboard',
		role: []
	},
	{
		id: 'my-transactions',
		title: 'My Transactions',
		type: 'item',
		icon: 'whatshot',
		url: '/mytransaction/list',
		role: [1,2]
	},
	{
		id: 'admin',
		title: 'Administrator',
		type: 'group',
		icon: 'cog',
		role: [1],
		children: [
			{
				id: 'customers',
				title: 'Customer',
				type: 'item',
				icon: 'whatshot',
				url: '/user/list',
				role: [1]
			},
			{
				id: 'items',
				title: 'Items',
				type: 'item',
				icon: 'whatshot',
				url: '/item/list',
				role: [1]
			},
			{
				id: 'logs',
				title: 'Logs',
				type: 'item',
				icon: 'whatshot',
				url: '/log/list',
				role: [1]
			},
			{
				id: 'transactions',
				title: 'All Transactions',
				type: 'item',
				icon: 'whatshot',
				url: '/transaction/list',
				role: [1]
			}
		]
	}
];

export default navigationConfig;
