import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import withReducer from 'app/store/withReducer';
import { Typography } from '@material-ui/core';
import reducer from '../store';
// import OrdersHeader from './OrdersHeader';
import UsersTable from './UsersTable';

function Users() {
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
                                    Customers
                                </Typography>
                            </FuseAnimate>
                        </div>                        
                    </div>            
                </div>                
            }
            content={
                <div className="w-full flex flex-col">
                    <UsersTable />
                </div>
            }
            innerScroll
        />
    );
}

export default withReducer('userReducer', reducer)(Users);
