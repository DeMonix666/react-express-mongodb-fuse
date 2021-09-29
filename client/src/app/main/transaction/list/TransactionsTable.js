import FuseScrollbars from '@fuse/core/FuseScrollbars';
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
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate';
import MyPagination from 'app/fuse-layouts/shared-components/MyPagination';
import { getTransactions } from '../store/transactionsSlice';

function TransactionsTable(props) {
    const dispatch     = useDispatch();
    const transactions = useSelector(({ transactionReducer }) => transactionReducer.transactions);

    const [loading, setLoading] = useState(true);
    const [init, setInit] = useState(true);

	useEffect(() => {     
        if (init){
            dispatch(getTransactions({
                page: 0
            }))
            .then(() => setLoading(false));

            setInit(false);
        }
        
    }, [dispatch, init]);
   
    const handleClick = _id => {
        //props.history.push(`/item/list/${_id}`);        
    };

    function handleChangePage(event, value) {
        setLoading(true);

        dispatch(getTransactions({
            page: value
        }))
        .then(() => setLoading(false));
    }

    if (loading) {
        return <FuseLoading />;
    }

    if (transactions.collection.length <= 0) {
        return (
            <FuseAnimate delay={100}>
                <div className="flex flex-1 transactions-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        No transactions found
                    </Typography>
                </div>
            </FuseAnimate>
        );
    }
    
	return (
        <div className="w-full">
            <FuseScrollbars className="flex-grow overflow-x-auto">                
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow className="h-40">
                            <TableCell className="p-4 md:p-16">ID</TableCell>
                            <TableCell className="p-4 md:p-16">Date</TableCell>
                            <TableCell className="p-4 md:p-16">Amount</TableCell>
                            <TableCell className="p-4 md:p-16">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {transactions.collection.map(n => {
                                return (
                                    <TableRow
                                        className="h-40 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={n._id}
                                    >
                                        
                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            <div className="flex">
                                                {n._id}
                                            </div>
                                        </TableCell>                                       
                                        
                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.created_at}
                                        </TableCell> 
                                        
                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.total}
                                        </TableCell> 

                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            <Button
                                                className="whitespace-nowrap mx-4"
                                                variant="contained"
                                                color="secondary"
                                                onClick={event => handleClick(n)}
                                            >
                                                Details
                                            </Button>
                                        </TableCell> 
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <MyPagination pageCount={transactions.pagination.pages} onChangePage={handleChangePage} />
        </div>
    );
}

export default withRouter(TransactionsTable);
