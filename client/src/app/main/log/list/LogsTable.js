import FuseScrollbars from '@fuse/core/FuseScrollbars';
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
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate';
import MyPagination from 'app/fuse-layouts/shared-components/MyPagination';
import { getLogs } from '../store/logsSlice';

function LogsTable(props) {
    const dispatch = useDispatch();
    const logs    = useSelector(({ logReducer }) => logReducer.logs);

    const [loading, setLoading] = useState(true);
    const [init, setInit] = useState(true);

	useEffect(() => {     
        if (init){
            dispatch(getLogs({
                page: 0
            }))
            .then(() => setLoading(false));

            setInit(false);
        }
        
    }, [dispatch, init]);
   
    const handleClick = _id => {
        console.log(_id);
    };

    function handleChangePage(event, value) {
        setLoading(true);

        dispatch(getLogs({
            page: value
        }))
        .then(() => setLoading(false));
    }

    if (loading) {
        return <FuseLoading />;
    }

    if (logs.collection.length <= 0) {
        return (
            <FuseAnimate delay={100}>
                <div className="flex flex-1 logs-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        No logs found
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
                            <TableCell className="p-4 md:p-16">IP</TableCell>
                            <TableCell className="p-4 md:p-16">URL</TableCell>
                            <TableCell className="p-4 md:p-16">Type</TableCell>
                            <TableCell className="p-4 md:p-16">Time</TableCell>
                            <TableCell className="p-4 md:p-16">Message</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {logs.collection.map(n => {
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
                                            {n.ip}
                                        </TableCell> 

                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.url}
                                        </TableCell> 
                                        
                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.type}
                                        </TableCell> 

                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.created_at}
                                        </TableCell> 

                                        <TableCell className="p-4 md:p-16 truncate" component="td" scope="row">
                                            {n.message}
                                        </TableCell> 
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <MyPagination pageCount={logs.pagination.pages} onChangePage={handleChangePage} />
        </div>
    );
}

export default withRouter(LogsTable);
