import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config';

export const markProductsAsSold = createAsyncThunk(
  'checkout/markProductsAsSold',
  async (cartItems, { rejectWithValue }) => {
    if (!cartItems || cartItems.length === 0) {
      return rejectWithValue('No items in cart to checkout.');
    }
    const batch = writeBatch(db);
    cartItems.forEach(item => {
      const productRef = doc(db, 'products', item.product.id);
      batch.update(productRef, { sold: true });
    });

    try {
      await batch.commit();
    
      return cartItems.map(item => item.product.id);
    } catch (error) {
      console.error('Error marking products as sold: ', error);
      return rejectWithValue(error.message);
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(markProductsAsSold.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(markProductsAsSold.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(markProductsAsSold.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;

