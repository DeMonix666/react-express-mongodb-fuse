import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import axios from "axios";

export const getItems = createAsyncThunk('items/list', async params => {
    const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/items/list`, {
        page: params.page
    });

    const data = await response.data;
    
    return data;
});

const itemsAdapter = createEntityAdapter({});

const itemsSlice = createSlice({
    name: 'items',
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
        [getItems.fulfilled]: (state, action) => {
            console.log('action.payload');
            console.log(action.payload);

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

export default itemsSlice.reducer;
