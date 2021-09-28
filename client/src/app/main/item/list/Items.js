import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import withReducer from 'app/store/withReducer';
import { Typography, Button, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import reducer from '../store';
import ItemsTable from './ItemsTable';

function Items() {
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
                                    Items
                                </Typography>
                            </FuseAnimate>
                        </div>

                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                component={Link}
                                to="/item/list/new"
                                className="whitespace-nowrap normal-case"
                                variant="contained"
                                color="secondary"
                            >
                                <span className="flex"><Icon>add</Icon> New</span>
                            </Button>
                        </FuseAnimate>                         
                    </div>
                </div>                
            }
            content={
                <div className="w-full flex flex-col">
                    <ItemsTable />
                </div>
            }
            innerScroll
        />
    );
}

export default withReducer('itemReducer', reducer)(Items);
