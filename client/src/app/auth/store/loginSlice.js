import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import userService from 'app/services/userService';
import { setUserData } from './userSlice';

export const submitLogin =
	({ username, password }) =>
	async dispatch => {
		return userService
			.signIn(username, password)
			.then(user => {
				dispatch(setUserData(user));

				return dispatch(loginSuccess());
			})
			.catch(errors => {
				return dispatch(loginError(errors));
			});
	};

const initialState = {
	success: false,
	errors: []
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
			state.errors = [];
		},
		loginError: (state, action) => {
			state.success = false;
			state.errors = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
