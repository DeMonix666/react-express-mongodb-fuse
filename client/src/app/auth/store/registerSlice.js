import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import userService from 'app/services/userService';
import { setUserData } from './userSlice';

export const submitRegister =
	({ username, password }) =>
	async dispatch => {
		return userService
			.createUser({
				username,
				password
			})
			.then(data => {
				dispatch(setUserData(data));
				return dispatch(registerSuccess());
			})
			.catch(errors => {
				return dispatch(registerError(errors));
			});
	};

const initialState = {
	success: false,
	errors: []
};

const registerSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			state.success = true;
			state.errors = [];
		},
		registerError: (state, action) => {
			state.success = false;
			state.errors = action.payload;
		}
	},
	extraReducers: {}
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
