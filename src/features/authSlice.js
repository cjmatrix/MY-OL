import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { auth } from '../firebase/config'; 

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';


const initialState = {
  user: null, 
  status: 'idle',
  error: null,
};

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return { uid: user.uid, email: user.email };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


 
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return { uid: user.uid, email: user.email };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      return null; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const checkUserSession = createAsyncThunk(
  'auth/checkUserSession',
  async (_, thunkAPI) => {
    return new Promise((resolve, reject) => {
    
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe(); 
          if (user) {
            
            resolve({ uid: user.uid, email: user.email });
          } else {
           
            resolve(null);
          }
        },
        (error) => {
          unsubscribe();
          reject(thunkAPI.rejectWithValue(error.message));
        }
      );
    });
  }
);



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder
      
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.error = null;
      })
      .addMatcher(
        (action) => [
          loginUser.fulfilled.type,
          signupUser.fulfilled.type,
          checkUserSession.fulfilled.type
        ].includes(action.type),
        (state, action) => {
          console.log(signupUser.fulfilled,'checking type')
          state.status = 'succeeded';
          state.user = action.payload; 
          state.error = null;
        }
      )
  
      .addMatcher(
        (action) => [
          loginUser.pending.type,
          signupUser.pending.type,
          logoutUser.pending.type,
          checkUserSession.pending.type
        ].includes(action.type),
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      // --- Handle Rejected States (Error) ---
      .addMatcher(
        (action) => [
          loginUser.rejected.type,
          signupUser.rejected.type,
          logoutUser.rejected.type,
          checkUserSession.rejected.type
        ].includes(action.type),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload; // 'action.payload' comes from thunkAPI.rejectWithValue
        }
      );
  },
});

// Export the reducer
export default authSlice.reducer;