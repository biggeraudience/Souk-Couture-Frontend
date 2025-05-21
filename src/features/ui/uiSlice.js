import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
  isModalOpen: false,
  modalContent: null, // Can store data for modal content
  isLoading: false, // General loading indicator for global operations
  toastMessage: null, // For displaying temporary messages (e.g., "Item added to cart!")
  toastType: 'info', // 'info' | 'success' | 'error' | 'warning'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalContent = action.payload || null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastMessage = action.payload.message;
      state.toastType = action.payload.type || 'info'; // Default to 'info'
    },
    clearToast: (state) => {
      state.toastMessage = null;
      state.toastType = 'info';
    }
  },
});

export const { toggleSidebar, openModal, closeModal, setLoading, showToast, clearToast } = uiSlice.actions;
export default uiSlice.reducer;