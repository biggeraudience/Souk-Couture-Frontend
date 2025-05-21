import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of cart items { productId, quantity, price, name, etc. }
  totalQuantity: 0,
  totalAmount: 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.productId === newItem.productId);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      state.totalQuantity += newItem.quantity;
      state.totalAmount += newItem.price * newItem.quantity;
      state.status = 'succeeded';
    },
    removeItemFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      const existingItem = state.items.find(item => item.productId === productIdToRemove);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.productId !== productIdToRemove);
      }
      state.status = 'succeeded';
    },
    updateItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.productId === productId);

      if (existingItem) {
        state.totalQuantity += (quantity - existingItem.quantity);
        state.totalAmount += (existingItem.price * (quantity - existingItem.quantity));
        existingItem.quantity = quantity;
      }
      // You might want to remove if quantity becomes 0 or less
      if (existingItem && existingItem.quantity <= 0) {
          state.items = state.items.filter(item => item.productId !== productId);
      }
      state.status = 'succeeded';
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.status = 'succeeded';
    },
    setCartError: (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
    },
    setCartLoading: (state) => {
        state.status = 'loading';
        state.error = null;
    }
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart, setCartError, setCartLoading } = cartSlice.actions;
export default cartSlice.reducer;