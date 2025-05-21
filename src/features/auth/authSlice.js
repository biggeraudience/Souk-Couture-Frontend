import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the authentication slice
const initialState = {
  user: null, // Will store user data (e.g., { id, email, name, role, token })
  isAuthenticated: false, // Boolean to quickly check if a user is logged in
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed' - for tracking async operations
  error: null,    // Stores any error messages from auth operations (e.g., login failure)
};

// Create the auth slice using createSlice from Redux Toolkit
const authSlice = createSlice({
  name: 'auth', // The name of the slice, used as a prefix for generated action types
  initialState, // The initial state defined above
  reducers: {
    // Reducer to set user data upon successful login or registration
    setUser: (state, action) => {
      state.user = action.payload; // Payload expected to be user object
      state.isAuthenticated = true;
      state.status = 'succeeded'; // Set status to succeeded
      state.error = null; // Clear any previous errors
    },
    // Reducer to handle user logout
    logout: (state) => {
      state.user = null; // Clear user data
      state.isAuthenticated = false; // Set authenticated to false
      state.status = 'idle'; // Reset status
      state.error = null; // Clear any errors
    },
    // Reducer to set loading status during auth API calls (e.g., login, register)
    setAuthLoading: (state) => {
      state.status = 'loading';
      state.error = null; // Clear errors when loading starts
    },
    // Reducer to set an error message if an auth operation fails
    setAuthError: (state, action) => {
      state.error = action.payload; // Payload expected to be an error message string
      state.status = 'failed'; // Set status to failed
    },
    // Reducer to clear the authentication error
    clearAuthError: (state) => {
      state.error = null;
      state.status = 'idle'; // Reset status to idle
    },
  },
  // extraReducers are used for handling actions defined outside of this slice,
  // typically for async thunks (e.g., loginUser, registerUser)
  // You'll add these here when you implement your async authentication logic.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginUser.pending, (state) => {
  //       state.status = 'loading';
  //       state.error = null;
  //     })
  //     .addCase(loginUser.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //       state.isAuthenticated = true;
  //       state.status = 'succeeded';
  //     })
  //     .addCase(loginUser.rejected, (state, action) => {
  //       state.status = 'failed';
  //       state.error = action.error.message;
  //     });
  // },
});

// Export the generated action creators
export const { setUser, logout, setAuthLoading, setAuthError, clearAuthError } = authSlice.actions;

// Export the reducer as the default export
export default authSlice.reducer;