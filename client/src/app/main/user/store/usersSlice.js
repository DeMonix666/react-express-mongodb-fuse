import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk('api/users/list', async params => {
    const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/users/list`, {
        page: params.page,
        limit: params.limit
    });

    const data = await response.data;
    
    return data;
});

const usersAdapter = createEntityAdapter({});

const usersSlice = createSlice({
    name: 'users',
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
        [getUsers.fulfilled]: (state, action) => {
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

export default usersSlice.reducer;
