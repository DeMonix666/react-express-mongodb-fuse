import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import { 
	Table, 
    TableBody, 
    TableCell, 
    TableHead, 
	TableRow,
    TablePagination,
    Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate';
import MyPagination from 'app/fuse-layouts/shared-components/MyPagination';
import { getUsers } from '../store/usersSlice';

function UsersTable(props) {
    const dispatch = useDispatch();
    const users    = useSelector(({ userReducer }) => userReducer.users);

    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [init, setInit] = useState(true);

	useEffect(() => {     
        if (init){
            dispatch(getUsers({
                page: 0,
                limit: rowsPerPage
            }))
            .then(() => setLoading(false));

            setInit(false);
        }
        
    }, [dispatch, init]);
   
    const handleClick = _id => {
    	console.log(_id);
        // props.history.push("/user/detail/" + _id);        
    };

    const handleChangePage = (event, value) => {
        setLoading(true);

        dispatch(getUsers({
            page: value,
            limit: rowsPerPage
        }))
        .then(() => setLoading(false));
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);

        dispatch(getUsers({
            page: 0,
            limit: event.target.value
        }))
        .then(() => setLoading(false));
    }

    if (loading) {
        return <FuseLoading />;
    }

    if (users.collection.length <= 0) {
        return (
            <FuseAnimate delay={100}>
                <div className="flex flex-1 items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        No users found
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
                            <TableCell className="p-4 md:p-16">Username</TableCell>
                            <TableCell className="p-4 md:p-16">Status</TableCell>
                            <TableCell className="p-4 md:p-16">Type</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.collection.map(n => {
                                return (
                                    <TableRow
                                        className="h-40 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={n._id}
                                        onClick={event => handleClick(n._id)}
                                    >
                                        
                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            <div className="flex">
                                                {n._id}
                                            </div>
                                        </TableCell>                                       
                                        
                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.username}
                                        </TableCell> 
                                        
                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.status}
                                        </TableCell> 

                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.type}
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
                count={users.pagination.total}
                rowsPerPage={users.pagination.limit}
                page={users.pagination.page}
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

export default withRouter(UsersTable);
