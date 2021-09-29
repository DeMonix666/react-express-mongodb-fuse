import { combineReducers } from '@reduxjs/toolkit';
import logs from './logsSlice';

const reducer = combineReducers({
	logs
});
export default reducer;
