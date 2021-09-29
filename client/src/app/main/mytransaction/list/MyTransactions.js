import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import withReducer from 'app/store/withReducer';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow, 
    Typography,
    Icon,
    Button
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Link } from 'react-router-dom';
import reducer from '../store';
import MyTransactionsTable from './MyTransactionsTable';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MyTransactions() {
    const [dialog, setDialog] = useState({ open: false });
    const [transaction, setTransaction] = useState(null)

    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={
                <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                    <div className="flex flex-1 w-full items-center justify-between">
                        <div className="flex items-center">
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                                    My Transactions
                                </Typography>
                            </FuseAnimate>
                        </div>
                    </div>
                </div>                
            }
            content={ 
                <div className="w-full flex flex-col">
                    <MyTransactionsTable dialog={dialog} setDialog={setDialog} setTransaction={setTransaction} />

                    {useMemo(() => {
                        const handleCloseDialog= () => {
                            setDialog({
                                ...dialog,
                                open: false
                            });
                        }

                        return (
                            <Dialog
                                open={dialog.open}
                                onClose={handleCloseDialog}
                                TransitionComponent={Transition}
                                className="min-w-lg"
                            >
                                {transaction && (
                                    <>
                                        <DialogTitle>
                                            <Typography className="pt-8 font-medium text-24">{transaction._id}</Typography>
                                        </DialogTitle>
                                        <DialogContent>
                                            <div>Time: {transaction.created_at}</div>
                                            <div>Total: {transaction.total}</div>
                                            <div className="pb-4">Status: {transaction.status}</div>
                                            
                                            <Table stickyHeader className="min-w-lg" aria-labelledby="tableTitle">
                                                <TableHead>
                                                    <TableRow className="h-40">
                                                        <TableCell className="p-4">Name</TableCell>
                                                        <TableCell className="p-4">Price</TableCell>
                                                        <TableCell className="p-4">Quantity</TableCell>
                                                        <TableCell className="p-4">Amount</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {transaction.items.map(n => {
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
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>

                                        </DialogContent>
                                        <DialogActions className="p-16">
                                            <Button onClick={handleCloseDialog} color="primary" variant="outlined">
                                                CLOSE
                                            </Button>
                                        </DialogActions>
                                    </>
                                )}
                            </Dialog>
                        );
                    }, [dialog, transaction])}
                </div>
            }
            innerScroll
        />
    );
}

export default withReducer('myTransactionReducer', reducer)(MyTransactions);
