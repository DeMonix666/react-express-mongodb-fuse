import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { Typography, Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import DashboardTable from './DashboardTable';
import { clearBasket } from './store/dashboardSlice';
import { showMessage } from 'app/store/fuse/messageSlice';

const useStyles = makeStyles({
	layoutRoot: {}
});

function Dashboard() {
	const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const dashboard    = useSelector(({ dashboardReducer }) => dashboardReducer.dashboard);

    const handleClearBasket = () => {
    	dispatch(clearBasket())
    }

    const handleCheckout = () => {
    	if(user.role.length === 0){
    		dispatch(showMessage({ message: 'Please login' }));
    		return false;
    	}
    }

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
                <div className="flex flex-1 w-full items-center justify-between">
                    <div className="flex flex-col items-start max-w-full min-w-0">
                        <div className="flex items-center">
                            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>				
                                <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                                    Shopping Cart
                                </Typography>
                            </motion.div>
                        </div>                  
                    </div>

                    <motion.div
						className="flex"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
					>
                    	<Button
                            className="whitespace-nowrap mx-4"
                            variant="contained"
                            color="secondary"
                            onClick={event => handleClearBasket()}
                        >
                            <span>Clear</span>
                        </Button>

                        <Button
                            className="whitespace-nowrap mx-4"
                            variant="contained"
                            color="secondary"
                            onClick={event => handleCheckout()}
                        >
                        	<span className="mx-4">{dashboard.total}</span>
                            <span>Checkout</span>
                        </Button>	                       
                    </motion.div>
                </div>                
            }
			content={
				<div className="p-24">
					<DashboardTable />
				</div>
			}
		/>
	);
}

export default withReducer('dashboardReducer', reducer)(Dashboard);
