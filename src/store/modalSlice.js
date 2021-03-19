import { createSlice } from '@reduxjs/toolkit';
import { enablePageScroll, disablePageScroll, clearQueueScrollLocks } from 'scroll-lock';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    title: null,
  },
  reducers: {
    open: (state, action) => {
      state.open = true;
      state.title = action.payload;

      // disablePageScroll();
    },
    close: (state) => {
      state.open = false;
      // state.title = null; had to preserve the old title to make modal disappear animation work

      // enablePageScroll();
      // clearQueueScrollLocks();
    },
  },
});

export const { open, close } = modalSlice.actions;

export const selectOpen = (state) => state.modal.open;
export const selectTitle = (state) => state.modal.title;

export default modalSlice.reducer;