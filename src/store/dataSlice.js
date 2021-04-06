import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api";
import { close } from "./modalSlice";

export const getCert = createAsyncThunk("cert/getCert", async (data, thunkAPI) => {
  const response = await api.getCert();
  return response.result.result !== null ? response.result.result : [];
});

export const addCert = createAsyncThunk("cert/addCert", async (data, thunkAPI) => {
  const response = await api.addCert(data);
  thunkAPI.dispatch(close());
  return response.result;
});

export const removeCert = createAsyncThunk("cert/removeCert", async (data, thunkAPI) => {
  const response = await api.removeCert(data);
  thunkAPI.dispatch(close());
  return response.result.status;
});

export const getDiploma = createAsyncThunk("diploma/getDiploma", async (data, thunkAPI) => {
  const response = await api.getDiploma();
  return response.result.result !== null ? response.result.result : [];
});

export const addDiploma = createAsyncThunk("diploma/addDiploma", async (data, thunkAPI) => {
  const response = await api.addDiploma(data);
  thunkAPI.dispatch(close());
  return response.result;
});

export const removeDiploma = createAsyncThunk("diploma/removeDiploma", async (data, thunkAPI) => {
  const response = await api.removeDiploma(data);
  thunkAPI.dispatch(close());
  return response.result.status;
});

export const getDegree = createAsyncThunk("degree/getDegree", async (data, thunkAPI) => {
  const response = await api.getDegree();
  return response.result.result !== null ? response.result.result : [];
});

export const addDegree = createAsyncThunk("degree/addDegree", async (data, thunkAPI) => {
  const response = await api.addDegree(data);
  thunkAPI.dispatch(close());
  return response.result;
});

export const removeDegree = createAsyncThunk("degree/removeDegree", async (data, thunkAPI) => {
  const response = await api.removeDegree(data);
  thunkAPI.dispatch(close());
  return response.result.status;
});

export const getCredential = createAsyncThunk("credential/getCredential", async (data, thunkAPI) => {
  const response = await api.getCredential();
  return response.result.result !== null ? response.result.result : [];
});

export const addCredential = createAsyncThunk("credential/addCredential", async (data, thunkAPI) => {
  const response = await api.addCredential(data);
  thunkAPI.dispatch(close());
  return response.result;
});

export const removeCredential = createAsyncThunk("credential/removeCredential", async (data, thunkAPI) => {
  const response = await api.removeCredential(data);
  thunkAPI.dispatch(close());
  return response.result.status;
});

export const getGuide = createAsyncThunk("guide/getGuide", async (data, thunkAPI) => {
  const response = await api.getGuide(data);
  console.log(response);
  return response.result.result !== null ? response.result.result : [];
});

export const addGuide = createAsyncThunk("guide/addGuide", async (data, thunkAPI) => {
  const response = await api.addGuide(data);
  thunkAPI.dispatch(close());
  return response.result;
});

export const editGuide = createAsyncThunk("guide/editGuide", async (data, thunkAPI) => {
  const response = await api.editGuide(data);
  thunkAPI.dispatch(close());
  return response.result.status;
});

export const removeGuide = createAsyncThunk("guide/removeGuide", async (data, thunkAPI) => {
  const response = await api.removeGuide(data);
  thunkAPI.dispatch(close());
  return response.result.status;
});

// Then, handle actions in your reducers:
export const dataSlice = createSlice({
  name: "data",
  initialState: { cert: [], diploma: [], degree: [], credential: [], guide: [], loading: {} },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    [getCert.fulfilled]: (state, action) => {
      state.cert = action.payload;
    },
    [addCert.fulfilled]: (state, action) => {
      state.loading.addCert = false;

      if (!action.payload.result) {
        return;
      }

      state.cert.push(action.payload.result);
    },
    [addCert.pending]: (state, action) => {
      state.loading.addCert = true;
    },
    [removeCert.fulfilled]: (state, action) => {
      state.loading.removeCert = false;

      if (!action.payload) {
        return;
      }

      state.cert = state.cert.filter((item, index) => item.CertID !== action.meta.arg.CertID);
    },
    [removeCert.pending]: (state, action) => {
      state.loading.removeCert = true;
    },
    [getDiploma.fulfilled]: (state, action) => {
      state.diploma = action.payload;
    },
    [addDiploma.fulfilled]: (state, action) => {
      state.loading.addDiploma = false;

      if (!action.payload.result) {
        return;
      }

      state.diploma.push(action.payload.result);
    },
    [addDiploma.pending]: (state, action) => {
      state.loading.addDiploma = true;
    },
    [removeDiploma.fulfilled]: (state, action) => {
      state.loading.removeDiploma = false;

      if (!action.payload) {
        return;
      }

      state.diploma = state.diploma.filter((item, index) => item.DiplomaID !== action.meta.arg.DiplomaID);
    },
    [removeDiploma.pending]: (state, action) => {
      state.loading.removeDiploma = true;
    },
    [getDegree.fulfilled]: (state, action) => {
      state.degree = action.payload;
    },
    [addDegree.fulfilled]: (state, action) => {
      state.loading.addDegree = false;

      if (!action.payload.result) {
        return;
      }

      state.degree.push(action.payload.result);
    },
    [addDegree.pending]: (state, action) => {
      state.loading.addDegree = true;
    },
    [removeDegree.fulfilled]: (state, action) => {
      state.loading.removeDegree = false;

      if (!action.payload) {
        return;
      }

      state.degree = state.degree.filter((item, index) => item.DegreeID !== action.meta.arg.DegreeID);
    },
    [removeDegree.pending]: (state, action) => {
      state.loading.removeDegree = true;
    },
    [getCredential.fulfilled]: (state, action) => {
      state.credential = action.payload;
    },
    [addCredential.fulfilled]: (state, action) => {
      state.loading.addCredential = false;

      if (!action.payload.result) {
        return;
      }

      state.credential.push(action.payload.result);
    },
    [addCredential.pending]: (state, action) => {
      state.loading.addCredential = true;
    },
    [removeCredential.fulfilled]: (state, action) => {
      state.loading.removeCredential = false;

      if (!action.payload) {
        return;
      }

      state.credential = state.credential.filter((item, index) => item.CredentialID !== action.meta.arg.CredentialID);
    },
    [removeCredential.pending]: (state, action) => {
      state.loading.removeCredential = true;
    },
    [getGuide.fulfilled]: (state, action) => {
      state.guide = action.payload;
    },
    [addGuide.fulfilled]: (state, action) => {
      state.loading.addGuide = false;

      if (!action.payload.result) {
        return;
      }

      state.guide.push(action.payload.result);
    },
    [addGuide.pending]: (state, action) => {
      state.loading.addGuide = true;
    },
    [editGuide.fulfilled]: (state, action) => {
      state.loading.editGuide = false;

      if (!action.payload) {
        return;
      }

      state.guide = state.guide.map((item, index) => {
        if (item.GuideID !== action.meta.arg.GuideID) {
          // This isn't the item we care about - keep it as-is
          return item;
        }
        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          Title: action.meta.arg.Title,
        };
      });
    },
    [editGuide.pending]: (state, action) => {
      state.loading.editGuide = true;
    },
    [removeGuide.fulfilled]: (state, action) => {
      state.loading.removeGuide = false;

      if (!action.payload) {
        return;
      }

      state.guide = state.guide.filter((item, index) => item.GuideID !== action.meta.arg.GuideID);
    },
    [removeGuide.pending]: (state, action) => {
      state.loading.removeGuide = true;
    },
  },
});

// export const {getCert} = dataSlice.actions;

export const selectLoading = (state) => state.data.loading;
export const selectCert = (state) => state.data.cert;
export const selectDiploma = (state) => state.data.diploma;
export const selectDegree = (state) => state.data.degree;
export const selectCredential = (state) => state.data.credential;
export const selectGuide = (state) => state.data.guide;
export const selectGuideVendor = (state) => {
  return state.data.guide.map((item) => {
    //if (item.Category === "vendor") {
    return { label: item.Title, value: item.Title }; //item.GuideID
  });
};
export const selectGuideCert = (state) => {
  return state.data.guide.map((item) => {
    return { label: item.Title, value: item.Title };
  });
};
export const selectGuideSpecialty = (state) => {
  return state.data.guide.map((item) => {
    return { label: item.Title, value: item.Title };
  });
};
export const selectGuideDegree = (state) => {
  return state.data.guide.map((item) => {
    return { label: item.Title, value: item.Title };
  });
};
export const selectGuideCredential = (state) => {
  return state.data.guide.map((item) => {
    return { label: item.Title, value: item.Title };
  });
};

export default dataSlice.reducer;

// Later, dispatch the thunk as needed in the app
// dispatch(getCert(123))
