import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FuseUtils from '@fuse/utils';
import axios from "axios";
import { showMessage } from 'app/store/fuse/messageSlice';

export const getItem = createAsyncThunk('items/detailsbyid', async params => {
    const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/items/detailsbyid`, {
        id: params.itemId
    });

    const data = await response.data;

    return (data === undefined || data.code  !== 1) ? null : data.data;
});

export const saveItem = createAsyncThunk('items/save', async (params, { dispatch }) => {
    const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/items/save`, params);
    const data = await response.data;

    if (data.message !== undefined) {
        dispatch(showMessage({ message: data.message }));
    }

    if (data.code === 1){
        dispatch(resetItem());
        dispatch(newItem());
    }

    return data.code === 1 ? data.data : null;
});

const itemSlice = createSlice({
    name: 'item',
    initialState: null,
    reducers: {
        resetItem: () => null,
        newItem: {
            reducer: (state, action) => action.payload,
            prepare: event => ({
                payload: {
                    _id: 'new',
                    name: '',
                    price: '',
                    quantity: ''
                }
            })
        }
    },
    extraReducers: {
        [getItem.fulfilled]: (state, action) => action.payload,
        [saveItem.fulfilled]: (state, action) => action.payload,    
    }
});

export const { resetItem, newItem } = itemSlice.actions;

export default itemSlice.reducer;
