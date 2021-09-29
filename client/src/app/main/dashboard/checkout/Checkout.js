import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTheme } from '@material-ui/core/styles';
import { Typography, Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import reducer from '../store';
import CheckoutTable from './CheckoutTable';
import { clearBasket, paynow } from '../store/cartSlice';

const useStyles = makeStyles({
	layoutRoot: {}
});

function Checkout(props) {
    const theme    = useTheme();
    const classes  = useStyles();
    const dispatch = useDispatch();
    const user     = useSelector(({ auth }) => auth.user);
    const cart     = useSelector(({ dashboardReducer }) => dashboardReducer.cart);

    const handleClearBasket = () => {
    	dispatch(clearBasket())
    }

    const handlePay = () => {
    	if(user.role.length === 0){
    		dispatch(showMessage({ message: 'Please login' }));
    	}

        if(cart.basket.length === 0){
            dispatch(showMessage({ message: 'Cart is empty' }));
        }

        dispatch(paynow(cart)).then((action) => {
            if(action.payload.code === 1) {
                props.history.push(`/dashboard`);
            }
        })
    }

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
                <div className="flex flex-1 w-full items-center justify-between">
                    <div className="flex flex-col items-start max-w-full min-w-0">
                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
                            <Typography
                                className="flex items-center sm:mb-12"
                                component={Link}
                                role="button"
                                to="/dashboard"
                                color="inherit"
                            >
                                <Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
                                <span className="hidden sm:flex mx-4 font-medium">Back</span>
                            </Typography>
                        </motion.div>

                        <div className="flex items-center max-w-full">
                            <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                                <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
                                    <Typography className="text-16 sm:text-20 truncate font-semibold">
                                        Checkout
                                    </Typography>
                                </motion.div>
                            </div>
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
                            onClick={event => handlePay()}
                        >
                            <span className="mx-4">{cart.total}</span>
                            <span>Pay</span>
                        </Button>	                       
                    </motion.div>
                </div>                
            }
			content={
				<div className="p-24">
					<CheckoutTable />
				</div>
			}
		/>
	);
}

export default withReducer('dashboardReducer', reducer)(Checkout);
