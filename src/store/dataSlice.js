import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

// First, create the thunk
export const fetchCert = createAsyncThunk("cert/fetchCert", async (CertId, thunkAPI) => {
  const response = await api.fetchCert(CertId);
  return response.result.result !== null ? response.result.result : [];
});

export const removeCert = createAsyncThunk("cert/removeCert", async (CertId, thunkAPI) => {
  const response = await api.removeCert(CertId);
  return response.result.result !== null ? response.result.result : [];
});

export const addCert = createAsyncThunk("cert/addCert", async ({ Vendor, Type, Status, File, Title }) => {
  const response = await api.addCert({ Vendor, Type, Status, File, Title });
  return response.result.result !== null ? response.result.result : [];
});

// Then, handle actions in your reducers:
export const dataSlice = createSlice({
  name: "data",
  initialState: { cert: [], loading: "idle" },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    [fetchCert.fulfilled]: (state, action) => {
      state.cert = action.payload;
    },
    [removeCert.fulfilled]: (state, action) => {
      state.cert = action.payload;
    },
  },
});

// export const {fetchCert} = dataSlice.actions;

export const selectCert = (state) => state.data.cert;

export default dataSlice.reducer;

// Later, dispatch the thunk as needed in the app
// dispatch(fetchCert(123))
