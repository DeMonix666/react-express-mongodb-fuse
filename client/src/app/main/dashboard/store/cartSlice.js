import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from 'app/store/fuse/messageSlice';

export const addToCart = createAsyncThunk('cart/addToCart', async item => {
    return item;
});

export const removeItem = createAsyncThunk('cart/removeItem', async item => {
    return item;
});

export const paynow = createAsyncThunk('cart/paynow', async (params, { dispatch }) => {
    const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/transactions/pay`, {
        items: JSON.stringify(params.basket),
        total: params.total
    });

    const data = await response.data;
    
    if (data.code === 0 && data.message !== undefined){
        dispatch(showMessage({ message: data.message }));
    }

    if (data.code === 1){
        dispatch(showMessage({ message: data.message }));
        dispatch(clearBasket());
    }

    return data;
});


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        basket:[],
        total:0,
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

            if (index === -1){
                state.basket.push({
                    _id: item._id,
                    name : item.name,
                    price: item.price,
                    quantity: 1
                });
            } else {
                state.basket[index].quantity += 1;
            }

            state.total += item.price;
        },
         
        [removeItem.fulfilled]: (state, action) => {
            const item = action.payload;
            const index = state.basket.findIndex(_item => _item._id === item._id);

            if (index !== -1){
                const basketItem = state.basket[index];

                state.total -= basketItem.price * basketItem.quantity;

                state.basket.splice(index,1);
            }
        },     
    }
});

export const { clearBasket } = cartSlice.actions;

export default cartSlice.reducer;
