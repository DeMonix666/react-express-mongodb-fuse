import { combineReducers } from '@reduxjs/toolkit';
import user from './userSlice';
import users from './usersSlice';

const reducer = combineReducers({
	user,
	users
});
export default reducer;
