import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";
import { close } from "./modalSlice";

export const getCert = createAsyncThunk("cert/getCert", async (data, thunkAPI) => {
  const response = await api.getCert();
  return response.result.result !== null ? response.result.result : [];
});

export const removeCert = createAsyncThunk("cert/removeCert", async (CertId, thunkAPI) => {
  const response = await api.removeCert(CertId);
  return response.result.result !== null ? response.result.result : [];
});

export const addCert = createAsyncThunk("cert/addCert", async (data, thunkAPI) => {
  const response = await api.addCert(data);
  thunkAPI.dispatch(close());
  thunkAPI.dispatch(getCert());
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
    [getCert.fulfilled]: (state, action) => {
      state.cert = action.payload;
    },
    [removeCert.fulfilled]: (state, action) => {
      state.cert = action.payload;
    },
  },
});

// export const {getCert} = dataSlice.actions;

export const selectCert = (state) => state.data.cert;

export default dataSlice.reducer;

// Later, dispatch the thunk as needed in the app
// dispatch(getCert(123))
