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
    Typography,
    Button
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
import { removeItem } from '../store/cartSlice';

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

function CheckoutTable(props) {
    const dispatch = useDispatch();
    // const items    = useSelector(({ dashboardReducer }) => dashboardReducer.items);
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
    
    const handleRemove = (n) => {
        dispatch(removeItem(n))
        .then((action) => {
            console.log(cart.basket.length);
        })
    };

	return (
        <div className="w-full">
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow className="h-40">
                            <TableCell className="p-4 md:p-16">Name</TableCell>
                            <TableCell className="p-4 md:p-16">Price</TableCell>
                            <TableCell className="p-4 md:p-16">Quantity</TableCell>
                            <TableCell className="p-4 md:p-16">Amount</TableCell>
                            <TableCell className="p-4 md:p-16">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {cart.basket.map(n => {
                                return (
                                    <TableRow
                                        className="h-40 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={n._id}                                        
                                    >
                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.name}
                                        </TableCell> 
                                        
                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.price}
                                        </TableCell> 

                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.quantity}
                                        </TableCell> 

                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.price * n.quantity}
                                        </TableCell> 

                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            <Button
                                                className="whitespace-nowrap mx-4"
                                                variant="contained"
                                                color="secondary"
                                                onClick={event => handleRemove(n)}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell> 
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

        </div>
    );
}

export default withRouter(CheckoutTable);
