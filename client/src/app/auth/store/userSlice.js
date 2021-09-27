/* eslint import/no-extraneous-dependencies: off*/
import { createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings, setDefaultSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import userService from 'app/services/userService';

export const setUserData = data => async (dispatch, getState) => {
	/*
        You can redirect the logged-in user to a specific route depending on his role
         */

	history.location.state = {
		redirectUrl: '/dashboard'
	};

 	dispatch(setDefaultSettings(null));

 	console.log(data);

	dispatch(setUser({
		role: [data.type],
		data: {
			username: data.username,
			status: data.status
		}
	}));
};

export const updateUserSettings = settings => async (dispatch, getState) => {
	const oldUser = getState().auth.user;
	const user = _.merge({}, oldUser, { data: { settings } });

	dispatch(updateUserData(user));

	return dispatch(setUserData(user));
};

export const updateUserShortcuts = shortcuts => async (dispatch, getState) => {
	const { user } = getState().auth;
	const newUser = {
		...user,
		data: {
			...user.data,
			shortcuts
		}
	};

	dispatch(updateUserData(user));

	return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
	const { user } = getState().auth;

	if (!user.role || user.role.length === 0) {
		// is guest
		return null;
	}

	history.push({
		pathname: '/'
	});

	userService.logout();

	dispatch(setInitialSettings());

	return dispatch(userLoggedOut());
};

export const updateUserData = user => async (dispatch, getState) => {
	if (!user.role || user.role.length === 0) {
		// is guest
		return;
	}
	
	userService
		.updateUserData(user)
		.then(() => {
			dispatch(showMessage({ message: 'User data saved with api' }));
		})
		.catch(error => {
			dispatch(showMessage({ message: error.message }));
		});
};

const initialState = {
	role: [],
	data: {
		username: 'Guest',
		status: null
	}
};

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => action.payload,
		userLoggedOut: (state, action) => initialState
	},
	extraReducers: {}
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
