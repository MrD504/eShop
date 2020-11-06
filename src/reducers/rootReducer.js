import {combineReducers} from 'redux';

import cartReducer from '../features/cart/cartSlice';

export default combineReducers({
    cart: cartReducer
})