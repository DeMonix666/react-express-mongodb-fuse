import Cart from './cart/Cart';

const DashboardConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/dashboard',
			component: Cart
		}
	]
};

export default DashboardConfig;
