import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    menuOpen: false,
    drawerOpen: false,
    cert: null,
    guideCategory: null,
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
    setCert: (state, action) => {
      state.cert = action.payload;
    },
    setGuideCategory: (state, action) => {
      state.guideCategory = action.payload;
    },
    setGuide: (state, action) => {
      state.guide = action.payload;
    },
  },
});

export const { toggleMenu, closeMenu, toggleDrawer, closeDrawer, setCert, setGuideCategory, setGuide } = uiSlice.actions;

export const selectMenuOpen = (state) => state.ui.menuOpen;
export const selectDrawerOpen = (state) => state.ui.drawerOpen;
export const selectCert = (state) => state.ui.cert;
export const selectGuideCategory = (state) => state.ui.guideCategory;
export const selectGuide = (state) => state.ui.guide;

export default uiSlice.reducer;
