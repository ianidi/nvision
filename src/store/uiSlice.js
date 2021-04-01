import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    menuOpen: false,
    drawerOpen: false,
    cert: null,
    diploma: null,
    degree: null,
    credential: null,
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
    setDiploma: (state, action) => {
      state.diploma = action.payload;
    },
    setDegree: (state, action) => {
      state.degree = action.payload;
    },
    setCredential: (state, action) => {
      state.credential = action.payload;
    },
    setGuideCategory: (state, action) => {
      state.guideCategory = action.payload;
    },
    setGuide: (state, action) => {
      state.guide = action.payload;
    },
  },
});

export const {
  toggleMenu,
  closeMenu,
  toggleDrawer,
  closeDrawer,
  setCert,
  setDiploma,
  setDegree,
  setCredential,
  setGuideCategory,
  setGuide,
} = uiSlice.actions;

export const selectMenuOpen = (state) => state.ui.menuOpen;
export const selectDrawerOpen = (state) => state.ui.drawerOpen;
export const selectCert = (state) => state.ui.cert;
export const selectDiploma = (state) => state.ui.diploma;
export const selectDegree = (state) => state.ui.degree;
export const selectCredential = (state) => state.ui.credential;
export const selectGuideCategory = (state) => state.ui.guideCategory;
export const selectGuide = (state) => state.ui.guide;

export default uiSlice.reducer;
