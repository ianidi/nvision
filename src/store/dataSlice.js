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

export const getDiploma = createAsyncThunk("diploma/getDiploma", async (data, thunkAPI) => {
  const response = await api.getDiploma();
  return response.result.result !== null ? response.result.result : [];
});

export const removeDiploma = createAsyncThunk("diploma/removeDiploma", async (DiplomaId, thunkAPI) => {
  const response = await api.removeDiploma(DiplomaId);
  return response.result.result !== null ? response.result.result : [];
});

export const addDiploma = createAsyncThunk("diploma/addDiploma", async (data, thunkAPI) => {
  const response = await api.addDiploma(data);
  thunkAPI.dispatch(close());
  thunkAPI.dispatch(getDiploma());
  return response.result.result !== null ? response.result.result : [];
});

export const getDegree = createAsyncThunk("degree/getDegree", async (data, thunkAPI) => {
  const response = await api.getDegree();
  return response.result.result !== null ? response.result.result : [];
});

export const removeDegree = createAsyncThunk("degree/removeDegree", async (DegreeId, thunkAPI) => {
  const response = await api.removeDegree(DegreeId);
  return response.result.result !== null ? response.result.result : [];
});

export const addDegree = createAsyncThunk("degree/addDegree", async (data, thunkAPI) => {
  const response = await api.addDegree(data);
  thunkAPI.dispatch(close());
  thunkAPI.dispatch(getDegree());
  return response.result.result !== null ? response.result.result : [];
});

export const getCredential = createAsyncThunk("credential/getCredential", async (data, thunkAPI) => {
  const response = await api.getCredential();
  return response.result.result !== null ? response.result.result : [];
});

export const removeCredential = createAsyncThunk("credential/removeCredential", async (CredentialId, thunkAPI) => {
  const response = await api.removeCredential(CredentialId);
  return response.result.result !== null ? response.result.result : [];
});

export const addCredential = createAsyncThunk("credential/addCredential", async (data, thunkAPI) => {
  const response = await api.addCredential(data);
  thunkAPI.dispatch(close());
  thunkAPI.dispatch(getCredential());
  return response.result.result !== null ? response.result.result : [];
});

// Then, handle actions in your reducers:
export const dataSlice = createSlice({
  name: "data",
  initialState: { cert: [], diploma: [], degree: [], credential: [], loading: "idle" },
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
    [getDiploma.fulfilled]: (state, action) => {
      state.diploma = action.payload;
    },
    [removeDiploma.fulfilled]: (state, action) => {
      state.diploma = action.payload;
    },
    [getDegree.fulfilled]: (state, action) => {
      state.degree = action.payload;
    },
    [removeDegree.fulfilled]: (state, action) => {
      state.degree = action.payload;
    },
    [getCredential.fulfilled]: (state, action) => {
      state.credential = action.payload;
    },
    [removeCredential.fulfilled]: (state, action) => {
      state.credential = action.payload;
    },
  },
});

// export const {getCert} = dataSlice.actions;

export const selectCert = (state) => state.data.cert;
export const selectDiploma = (state) => state.data.diploma;
export const selectDegree = (state) => state.data.degree;
export const selectCredential = (state) => state.data.credential;

export default dataSlice.reducer;

// Later, dispatch the thunk as needed in the app
// dispatch(getCert(123))
