import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Example admin-specific data (you'll expand these as needed)
  usersManaged: [],   // e.g., a list of users for admin to view/manage
  productsManaged: [], // e.g., products currently displayed in admin view
  ordersManaged: [],  // e.g., orders for admin to process

  // State for tracking API calls or operations within the admin panel
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,    // Stores any error messages
  isDashboardLoading: false, // General loading state for admin dashboard operations
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Reducer to set loading state for admin operations
    setAdminLoading: (state, action) => {
      state.isDashboardLoading = action.payload;
      state.status = action.payload ? 'loading' : 'idle';
      state.error = null; // Clear previous errors when loading starts
    },
    // Reducer to set an error message for admin operations
    setAdminError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
      state.isDashboardLoading = false; // Stop loading on error
    },
    // Example: For when admin successfully fetches a list of users
    setUsersManaged: (state, action) => {
      state.usersManaged = action.payload;
      state.status = 'succeeded';
      state.error = null;
      state.isDashboardLoading = false;
    },
    // Example: For when admin successfully updates a product
    // (You'd typically update a single product in productsManaged array here)
    // updateProductInAdminView: (state, action) => { ... },
    // deleteProductFromAdminView: (state, action) => { ... },
    // setOrdersManaged: (state, action) => { ... },
  },
  // extraReducers will be used here if you add async thunks later
  // for operations like fetching data from a backend API (e.g., fetchAllUsersForAdmin)
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(someAdminThunk.pending, (state) => {
  //       state.status = 'loading';
  //       state.isDashboardLoading = true;
  //     })
  //     .addCase(someAdminThunk.fulfilled, (state, action) => {
  //       state.status = 'succeeded';
  //       state.isDashboardLoading = false;
  //       // ... handle data ...
  //     })
  //     .addCase(someAdminThunk.rejected, (state, action) => {
  //       state.status = 'failed';
  //       state.isDashboardLoading = false;
  //       state.error = action.error.message;
  //     });
  // },
});

// Export the actions
export const { setAdminLoading, setAdminError, setUsersManaged } = adminSlice.actions;

// Export the reducer as the default export
export default adminSlice.reducer;