import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import DashboardConfig from 'app/main/dashboard/DashboardConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import RegisterConfig from 'app/main/register/RegisterConfig';
import UserConfig from 'app/main/user/UserConfig';
import ItemConfig from 'app/main/item/ItemConfig';
import LogConfig from 'app/main/log/LogConfig';
import TransactionConfig from 'app/main/transaction/TransactionConfig';
import MyTransactionConfig from 'app/main/mytransaction/MyTransactionConfig';

const routeConfigs = [DashboardConfig, LoginConfig, RegisterConfig, UserConfig, ItemConfig, LogConfig, TransactionConfig, MyTransactionConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/dashboard" />
	}
];

export default routes;
