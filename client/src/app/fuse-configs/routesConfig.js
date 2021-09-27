import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import DashboardConfig from 'app/main/dashboard/DashboardConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import RegisterConfig from 'app/main/register/RegisterConfig';

const routeConfigs = [DashboardConfig, LoginConfig, RegisterConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/dashboard" />
	}
];

export default routes;
