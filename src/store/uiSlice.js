import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    menuOpen: false,
    drawerOpen: false,
    guide: null,
  },
  reducers: {
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu: (state) => {
      state.menuOpen = false;
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    closeDrawer: (state) => {
      state.drawerOpen = false;
    },
    setGuide: (state, action) => {
      state.guide = action.payload;
    },
  },
});

export const { toggleMenu, closeMenu, toggleDrawer, closeDrawer, setGuide } = uiSlice.actions;

export const selectMenuOpen = (state) => state.ui.menuOpen;
export const selectDrawerOpen = (state) => state.ui.drawerOpen;
export const selectGuide = (state) => state.ui.guide;

export default uiSlice.reducer;
