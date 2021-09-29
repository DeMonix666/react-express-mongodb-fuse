import Cart from './cart/Cart';
import Checkout from './checkout/Checkout';

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
		},
		{
			path: '/checkout',
			component: Checkout
		}
	]
};

export default DashboardConfig;
