import { combineReducers } from '@reduxjs/toolkit';
import item from './itemSlice';
import items from './itemsSlice';

const reducer = combineReducers({
	item,
	items
});
export default reducer;
