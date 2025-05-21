import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [], // Array of product objects
  selectedProduct: null, // For single product detail view
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setProductError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    setProductLoading: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.status = 'idle';
    }
  },
  // You would add extraReducers here for handling async thunks (e.g., fetchAllProducts, fetchProductById)
});

export const { setProducts, setSelectedProduct, setProductError, setProductLoading, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;