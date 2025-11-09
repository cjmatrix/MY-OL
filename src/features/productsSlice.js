import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// --- 1. Firebase Imports ---
// Import our configured 'db' instance and Firestore functions
import { db } from '../firebase/config';

import { markProductsAsSold } from './checkoutSlice';



import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productsList;
  }
);


export const addProduct = createAsyncThunk(
  'products/addProduct', 
  async (productData) => {

    const docRef = await addDoc(collection(db, 'products'), productData);
    

    return { id: docRef.id, ...productData };
  }
);

export const removeProduct = createAsyncThunk(
  'products/removeProduct', 
  async (productId) => {
   
    const productDoc = doc(db, 'products', productId);
    
   
    await deleteDoc(productDoc);
    
    return productId;
  }
);


const initialState = {
  products: [],
  status: 'idle', 
  error: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  
  },

  extraReducers: (builder) => {
    builder
      
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
    
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeededAdd';
        state.products.unshift(action.payload); 
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
     
      .addCase(removeProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(markProductsAsSold.fulfilled,(state,action)=>{

        const listOfCheckouts=action.payload;

        state.products.forEach(product=>{
          if(listOfCheckouts.includes(product.id))
             product.sold=true
        })

      })
  },
});

export default productSlice.reducer;