
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import cartReducer from '../features/cartSlice'
import checkoutReducer from '../features/checkoutSlice'

import authSliceReducer from '../features/authSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    carts:cartReducer,
    checkouts:checkoutReducer,
    auth:authSliceReducer
  },
});
