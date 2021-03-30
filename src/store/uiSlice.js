import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    menuOpen: false,
    drawerOpen: false,
    guideCategory: null,
    guideID: null,
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
    setGuideCategory: (state, action) => {
      state.guideCategory = action.payload;
    },
    setGuideID: (state, action) => {
      state.guideID = action.payload;
    },
  },
});

export const { toggleMenu, closeMenu, toggleDrawer, closeDrawer, setGuideCategory, setGuideID } = uiSlice.actions;

export const selectMenuOpen = (state) => state.ui.menuOpen;
export const selectDrawerOpen = (state) => state.ui.drawerOpen;
export const selectGuideCategory = (state) => state.ui.guideCategory;
export const selectGuideID = (state) => state.ui.guideID;

export default uiSlice.reducer;
