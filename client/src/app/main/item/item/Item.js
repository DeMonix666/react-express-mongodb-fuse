import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext, useForm, FormProvider } from 'react-hook-form';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {getItem, saveItem, resetItem, newItem} from "../store/itemSlice";
import reducer from '../store';
import ItemForm from './ItemForm';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    price: yup.number().required('Price is required'),
    quantity: yup.number().required('Quantity is required')
});

function Item(props) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const item = useSelector(({ itemReducer }) => itemReducer.item);
    const routeParams = useParams();
    const [noItem, setNoItem] = useState(false);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });
    const { reset, watch, control, onChange, formState, getValues } = methods;
    const { isValid, dirtyFields } = formState;
    const form = watch();
    const name = watch('name');

    useDeepCompareEffect(() => {
        function updateItemState() {
            const { itemId } = routeParams;

            if (itemId === 'new') {
                dispatch(newItem());
            } else {
                dispatch(getItem(routeParams)).then(action => {
                    if (!action.payload) {
                        setNoItem(true);
                    }
                });
            }
        }

        updateItemState();
    }, [dispatch, routeParams]);

    useEffect(() => {
        if (!item) {
            return;
        }

        reset({
            name: item.name,
            price: item.price,
            quantity: item.quantity
        });
    }, [item, reset]);

    useEffect(() => {
        return () => {
            dispatch(resetItem());
            setNoItem(false);
        };
    }, [dispatch]);

    function handleSaveItem() {
        dispatch(saveItem(getValues())).then(action => {
                    dispatch(resetItem());
                });
    }

    return (
        <FormProvider {...methods}>
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
                }}
                header={
                    <div className="flex flex-1 w-full items-center justify-between">
                        <div className="flex flex-col items-start max-w-full min-w-0">
                            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
                                <Typography
                                    className="flex items-center sm:mb-12"
                                    component={Link}
                                    role="button"
                                    to="/item/list"
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
                                            {name || 'New Item'}
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
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                onClick={handleSaveItem}
                            >
                                Save
                            </Button>
                        </motion.div>
                    </div>
                }

                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <ItemForm />
                    </div>
                }
                innerScroll
            />
        </FormProvider>
    );
}

export default withReducer("itemReducer", reducer)(Item);
