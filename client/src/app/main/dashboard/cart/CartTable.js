import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import _ from '@lodash';
import { 
	Table, 
    TableBody, 
    TableCell, 
    TableHead, 
	TableRow, 
    Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate';
import MyPagination from 'app/fuse-layouts/shared-components/MyPagination';
import { getItems} from '../store/itemsSlice';
import { addToCart } from '../store/cartSlice';

const useStyles = makeStyles(theme => ({
    root: {},
    board: {
        cursor: 'pointer',
        transitionProperty: 'box-shadow border-color',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
    newBoard: {}
}));

function CartTable(props) {
    const dispatch = useDispatch();
    const items    = useSelector(({ dashboardReducer }) => dashboardReducer.items);
    const cart    = useSelector(({ dashboardReducer }) => dashboardReducer.cart);
    const classes = useStyles(props);
    const [loading, setLoading] = useState(true);
    const [init, setInit] = useState(true);

    const container = {
        show: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

	useEffect(() => {     
        if (init){
            dispatch(getItems({
                page: 0
            }))
            .then(() => setLoading(false));

            setInit(false);
        }
        
    }, [dispatch, init]);
   
    const handleClick = (n) => {
        dispatch(addToCart(n))
        .then((action) => {
            console.log(cart.basket.length);
        })
    };

    const handleChangePage = (event, value) => {
        setLoading(true);

        dispatch(getItems({
            page: value
        }))
        .then(() => setLoading(false));
    }

    if (loading) {
        return <FuseLoading />;
    }

    if (items.collection.length <= 0) {
        return (
            <FuseAnimate delay={100}>
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        No items found
                    </Typography>
                </div>
            </FuseAnimate>
        );
    }
    
	return (
        <div className="w-full">
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
                    <div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="flex flex-wrap w-full justify-center py-32 px-16"
                        >

                            {items.collection.map(n => {
                                return (
                                    <motion.div variants={item} className="w-224 h-224 p-16" key={n._id}>
                                        <Paper
                                            className={clsx(
                                                classes.board,
                                                'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
                                            )}
                                            role="button"
                                            onClick={event => handleClick(n)}
                                        >
                                            <Icon className="text-56" color="action">
                                                assessment
                                            </Icon>
                                            <Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
                                                {n.name}
                                            </Typography>
                                            <Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
                                                {n.price}
                                            </Typography>
                                            <Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
                                                {n.quantity <= 0 ? 'Out of stock' : ''}
                                            </Typography>
                                        </Paper>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </FuseScrollbars>

            <MyPagination pageCount={items.pagination.pages} onChangePage={handleChangePage} />
        </div>
    );
}

export default withRouter(CartTable);
