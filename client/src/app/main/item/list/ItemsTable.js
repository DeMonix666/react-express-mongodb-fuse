import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import { 
	Table, 
    TableBody, 
    TableCell, 
    TableHead, 
	TableRow,
    TablePagination,
    Typography,
    Button
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate';
import MyPagination from 'app/fuse-layouts/shared-components/MyPagination';
import { getItems } from '../store/itemsSlice';

function ItemsTable(props) {
    const dispatch = useDispatch();
    const items    = useSelector(({ itemReducer }) => itemReducer.items);

    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [init, setInit] = useState(true);

	useEffect(() => {     
        if (init){
            dispatch(getItems({
                page: 0,
                limit: rowsPerPage
            }))
            .then(() => setLoading(false));

            setInit(false);
        }
        
    }, [dispatch, init]);
   
    const handleClick = _id => {
        props.history.push(`/item/list/${_id}`);        
    };

    const handleChangePage = (event, value) => {
        setLoading(true);

        dispatch(getItems({
            page: value,
            limit: rowsPerPage
        }))
        .then(() => setLoading(false));
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);

        dispatch(getItems({
            page: 0,
            limit: event.target.value
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
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow className="h-40">
                            <TableCell className="p-4 md:p-16">ID</TableCell>
                            <TableCell className="p-4 md:p-16">Name</TableCell>
                            <TableCell className="p-4 md:p-16">Price</TableCell>
                            <TableCell className="p-4 md:p-16">Quantity</TableCell>
                            <TableCell className="p-4 md:p-16">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {items.collection.map(n => {
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
                                            {n.name}
                                        </TableCell> 
                                        
                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.price}
                                        </TableCell> 

                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.quantity}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            <Button
                                                className="whitespace-nowrap mx-4"
                                                variant="contained"
                                                color="secondary"
                                                onClick={event => handleClick(n._id)}
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

            <TablePagination
                className="flex-shrink-0 border-t-1"
                component="div"
                count={items.pagination.total}
                rowsPerPage={items.pagination.limit}
                page={items.pagination.page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default withRouter(ItemsTable);
