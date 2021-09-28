import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk('api/users/detailsbyid', async params => {
    const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/users/detailsbyid`, {
        id: params.id
    });
    const data = await response.data;

    return (data.code === 1) ? data.data : null;
});

const userSlice = createSlice({
    name: 'users',
    initialState: null,
    reducers: {
        resetUser: () => null,
    },
    extraReducers: {
        [getUser.fulfilled]: (state, action) => {
            state = action.payload.data;
        }       
    }
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
