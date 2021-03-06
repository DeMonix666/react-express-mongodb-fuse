import { combineReducers } from '@reduxjs/toolkit';
import cart from './cartSlice';
import items from './itemsSlice';

const reducer = combineReducers({
	cart,
	items
});
export default reducer;
