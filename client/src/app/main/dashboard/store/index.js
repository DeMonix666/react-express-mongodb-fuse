import { combineReducers } from '@reduxjs/toolkit';
import dashboard from './dashboardSlice';

const reducer = combineReducers({
	dashboard
});
export default reducer;
