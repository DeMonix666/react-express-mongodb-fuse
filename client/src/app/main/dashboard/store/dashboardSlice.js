import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import axios from "axios";

export const getItems = createAsyncThunk('dashboard/item/list', async params => {
    const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/items/list`, {
        page: params.page
    });

    const data = await response.data;
    
    return data;
});


export const addToCart = createAsyncThunk('dashboard/addToCart', async item => {
    console.log(item)

    return item;
});


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        collection:[],
        basket:[],
        total:0,
        pagination: {
            page: 0,
            pages: 0,
            total: 0,
            limit: 10            
        }
    },
    reducers: {
        clearBasket: (state) => {
            state.basket = [];
            state.total = 0;
        }
    },
    extraReducers: {
        [addToCart.fulfilled]: (state, action) => {
            const item = action.payload;
            const index = state.basket.findIndex(_item => _item._id === item._id);

            if (index == -1){
                state.basket.push({
                    _id: item._id,
                    name : item.name,
                    price: item.price,
                    quantity: 1
                });
            } else {
                state.basket[index].quantity++;
            }

            state.total += item.price;
        },
        [getItems.fulfilled]: (state, action) => {
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

export const { clearBasket } = dashboardSlice.actions;

export default dashboardSlice.reducer;
