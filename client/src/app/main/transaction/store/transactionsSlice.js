import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from 'app/store/fuse/messageSlice';

export const getTransactions = createAsyncThunk('transactions/list', async (params, { dispatch }) => {
    const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/transactions/list`, {
        page: params.page
    });

    const data = await response.data;
    
    if (data.code === 0 && data.message !== undefined){
        dispatch(showMessage({ message: data.message }));
    }

    return data;
});

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        collection:[],
        pagination: {
            page: 0,
            pages: 0,
            total: 0,
            limit: 10
        }
    },
    reducers: {
    },
    extraReducers: {
        [getTransactions.fulfilled]: (state, action) => {
            if (action.payload.code === 1){
                state.collection = action.payload.data.collection;
                state.pagination = action.payload.data.pagination;
            } else {
                state.collection = [];
                state.pagination = {
                    page: 0,
                    pages: 0,
                    total: 0,
                    limit: 10            
                };
            }
        }       
    }
});

export default transactionsSlice.reducer;
