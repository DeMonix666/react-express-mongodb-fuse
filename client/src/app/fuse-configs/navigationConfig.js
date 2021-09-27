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
		id: 'transactions',
		title: 'Your Transactions',
		type: 'item',
		icon: 'whatshot',
		url: '/customer/transaction',
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
				url: '/users',
				role: [1]
			},
			{
				id: 'items',
				title: 'Items',
				type: 'item',
				icon: 'whatshot',
				url: '/items',
				role: [1]
			}
		]
	}
];

export default navigationConfig;
