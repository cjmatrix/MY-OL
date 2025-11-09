


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from '../firebase/config';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// --- HELPER FUNCTION (Unchanged) ---
// This logic is still needed, but we'll call it inside our thunks
function recalculateCart(cartItems) {
    let totQ = 0;
    let totP = 0;
    
    cartItems.forEach(item => {
        totQ += item.quantity;
        totP += item.quantity * Number(item.product.price);
    });

    return { totalQuantity: totQ, totalPrice: totP };
}

// --- NEW INITIAL STATE ---
const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// --- NEW ASYNC THUNKS ---

/**
 * Fetches the user's cart from Firestore when they log in.
 */
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, thunkAPI) => {
    const uid = thunkAPI.getState().auth.user?.uid;
    if (!uid) {
      return thunkAPI.rejectWithValue('No user logged in');
    }
    
    const cartDocRef = doc(db, 'carts', uid);
    const docSnap = await getDoc(cartDocRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Returns { cartItems, totalQuantity, totalPrice }
    } else {
      // No cart for this user, return a fresh initial state
      return initialState;
    }
  }
); 

/**
 * Helper thunk to save the entire cart state to Firestore.
 * This is used by all other cart-modifying thunks.
 */
const saveCartToFirestore = createAsyncThunk(
  'cart/saveCartToFirestore',
  async (cartState, thunkAPI) => {
    const uid = thunkAPI.getState().auth.user?.uid;
    if (!uid) {
      return thunkAPI.rejectWithValue('No user logged in');
    }
    
    const cartDocRef = doc(db, 'carts', uid);
    // Only save the serializable data, not status or error
    const dataToSave = {
      cartItems: cartState.cartItems,
      totalQuantity: cartState.totalQuantity,
      totalPrice: cartState.totalPrice,
    };
    
    await setDoc(cartDocRef, dataToSave);
    return dataToSave;
  }
);

/**
 * Adds an item to the cart, recalculates, and saves to Firestore.
 */
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productToAdd, thunkAPI) => {
    const state = thunkAPI.getState().carts;
   
    // Create a deep copy of the current cart items
    const newCartItems = JSON.parse(JSON.stringify(state.cartItems));
    
    const existItem = newCartItems.find((obj) => obj.product.id === productToAdd.id);

    if (existItem) {
        existItem.quantity++;
        existItem.totalPriceItem = existItem.quantity * Number(existItem.product.price);
    } else {
        newCartItems.push({
            product: productToAdd,
            quantity: 1,
            totalPriceItem: productToAdd.price
        });
    }

    const { totalQuantity, totalPrice } = recalculateCart(newCartItems);
    const newState = { cartItems: newCartItems, totalQuantity, totalPrice };

    // Dispatch the save thunk and return its result
    const result = await thunkAPI.dispatch(saveCartToFirestore(newState));
    return result.payload; // This payload will be used in extraReducers
  }
);

/**
 * Removes one item from the cart, recalculates, and saves.
 */
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productToRemove, thunkAPI) => {
    const state = thunkAPI.getState().carts;
    const newCartItems = JSON.parse(JSON.stringify(state.cartItems));

    const existItem = newCartItems.find((obj) => obj.product.id === productToRemove.id);
            
    if (existItem && existItem.quantity > 1) {
        existItem.quantity--;
        existItem.totalPriceItem = existItem.quantity * Number(existItem.product.price);
    }
    // Optional: else if quantity is 1, you could dispatch deleteFromCart
    // else if (existItem.quantity === 1) {
    //   return thunkAPI.dispatch(deleteFromCart(productToRemove));
    // }

    const { totalQuantity, totalPrice } = recalculateCart(newCartItems);
    const newState = { cartItems: newCartItems, totalQuantity, totalPrice };

    const result = await thunkAPI.dispatch(saveCartToFirestore(newState));
    return result.payload;
  }
);

/**
 * Deletes a product line entirely from the cart, recalculates, and saves.
 */
export const deleteFromCart = createAsyncThunk(
  'cart/deleteFromCart',
  async (productToDelete, thunkAPI) => {
    const state = thunkAPI.getState().carts;
    
    const remainingItems = state.cartItems.filter(obj => obj.product.id !== productToDelete.id);
    
    const { totalQuantity, totalPrice } = recalculateCart(remainingItems);
    const newState = { cartItems: remainingItems, totalQuantity, totalPrice };

    const result = await thunkAPI.dispatch(saveCartToFirestore(newState));
    return result.payload;
  }
);

/**
 * Clears the cart, recalculates, and saves the empty state to Firestore.
 */
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, thunkAPI) => {
    const newState = { cartItems: [], totalQuantity: 0, totalPrice: 0 };
    // Dispatch save thunk *even for clearing* to update Firestore
    const result = await thunkAPI.dispatch(saveCartToFirestore(newState));
    return result.payload;
  }
);


// --- REFACTORED SLICE ---

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    // Regular reducers are now empty, all logic is in thunks
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle clearing the cart on logout
            .addCase('auth/logoutUser/fulfilled', (state) => {
                // Reset to the initial state when user logs out
                return initialState;
            })
            // Matcher for all "pending" cart actions
            .addMatcher(
                (action) => action.type.startsWith('cart/') && action.type.endsWith('/pending'),
                (state, action) => {
                    // Use 'loading' for fetch, 'saving' for updates
                    state.status = action.type.includes('fetch') ? 'loading' : 'saving';
                    state.error = null;
                }
            )
            
            // Matcher for all "fulfilled" cart actions
            .addMatcher(
                (action) => action.type.startsWith('cart/') && action.type.endsWith('/fulfilled'),
                (state, action) => {
                    state.status = 'succeeded';
                    state.cartItems = action.payload.cartItems;
                    state.totalQuantity = action.payload.totalQuantity;
                    state.totalPrice = action.payload.totalPrice;
                    state.error = null;
                }
            )
            // Matcher for all "rejected" cart actions
            .addMatcher(
                (action) => action.type.startsWith('cart/') && action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload; // payload comes from thunkAPI.rejectWithValue
                }
            );
    }
});

// We no longer export actions from cartSlice.actions
// We only export the async thunks.
export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// // const initialState={
// //     cartItems:[],
// //     totalQuantity:0,
// //     totalPrice:0
// // }

// function loadFromLocalStorage(){

//     const cartData= localStorage.getItem('cartState')

//     if(cartData===null){
//         return {
//             cartItems:[],
//             totalQuantity:0,
//             totalPrice:0,
//         }
//     }
    
//     return JSON.parse(cartData)

// }


// function saveStateToLocalStorage(state){
//     localStorage.setItem('cartState',JSON.stringify(state))
// }

// function recalculation(state){
    
//     let totQ=0;
//     let totP=0;
//     state.cartItems.forEach(item=>{

//         totQ=totQ+item.quantity;

//         totP+=item.quantity*Number(item.product.price)

//     })


//     state.totalQuantity=totQ;

//     state.totalPrice=totP

// }

// const initialState=loadFromLocalStorage()

// export const cartSlice=createSlice({
//     name:'cart',
//     initialState,
//     reducers:{

//         addToCart:(state,action)=>{
          
//             const newItem=action.payload;

//             const existItem=state.cartItems.find((obj)=>obj.product.id===newItem.id)

//             if(existItem){
//                 existItem.quantity++;
//                 existItem.totalPriceItem=existItem.quantity*Number(existItem.product.price)

//             }
//             else
//             {
//                 state.cartItems.push({
//                     product:newItem,
//                     quantity:1,
//                     totalPriceItem:newItem.price
//                 })
//             }

//             recalculation(state)
//             saveStateToLocalStorage(state)
//         },
//         removeFromCart:(state,action)=>{
          
//             const newItem=action.payload;

//             const existItem=state.cartItems.find((obj)=>obj.product.id===newItem.id)
            
//                 if(existItem && existItem.quantity>1){
//                     {
//                            existItem.quantity--;
//                             existItem.totalPriceItem=existItem.quantity*Number(existItem.product.price)
//                     }

//                 }
        
        

//             recalculation(state)
//             saveStateToLocalStorage(state)
//         },
//         deleteFromCart:(state,action)=>{

//             const deleteItem=action.payload;

//             const remainingItem=state.cartItems.filter(obj=>obj.product.id!==deleteItem.id)

//             state.cartItems=remainingItem;
//                  recalculation(state)
              

//         },
//         clearCart:(state)=>{

           
//             const clearValue=
//              {
//                 cartItems:[],
//                 totalQuantity:0,
//                 totalPrice:0
//             }

            
//             localStorage.setItem('cartState',JSON.stringify(clearValue));

//             state.cartItems=[];
//             state.totalQuantity=0;
//             state.totalPrice=0;

//         }

//     }
// })

// export const {addToCart,clearCart,removeFromCart,deleteFromCart}=cartSlice.actions;

// export default cartSlice.reducer