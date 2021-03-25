import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";

// First, create the thunk
export const fetchCert = createAsyncThunk("users/fetchCert", async (certId, thunkAPI) => {
  const response = await api.fetchCert(certId);
  return response.result;
});

// Then, handle actions in your reducers:
export const dataSlice = createSlice({
  name: "data",
  initialState: { cert: [], loading: "idle" },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchCert.fulfilled]: (state, action) => {
      // Add user to the state array
      state.cert.push(action.payload);
    },
  },
});

// export const {fetchCert} = dataSlice.actions;

export const selectVerifyResendEmail = (state) => state.member.VerifyResendEmail;

export default dataSlice.reducer;

// Later, dispatch the thunk as needed in the app
// dispatch(fetchCert(123))
