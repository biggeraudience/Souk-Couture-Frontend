import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Stores user data if logged in
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Example: For setting user upon login
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.error = null;
    },
    // Example: For logging out
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
    // Example: For handling authentication errors
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    // Example: For setting loading state during login/registration API calls
    setAuthLoading: (state) => {
      state.status = 'loading';
      state.error = null;
    }
  },
  // You would add extraReducers here for handling async thunks (e.g., login, register)
});

export const { setUser, logout, setAuthError, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;