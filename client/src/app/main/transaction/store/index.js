import { combineReducers } from '@reduxjs/toolkit';
import transactions from './transactionsSlice';

const reducer = combineReducers({
	transactions
});
export default reducer;
