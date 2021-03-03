import { createSlice } from '@reduxjs/toolkit';
import { getUnixTime } from 'date-fns';

export const memberSlice = createSlice({
  name: 'member',
  initialState: {
    OfferID: null,
    InvoiceID: null,
    InvoiceEmail: null,
    VerifyResendEmail: null,
    VerifyResendTimeout: null,
    codeTimeout: null,
  },
  reducers: {
    setOfferID: (state, action) => {
      const { OfferID } = action.payload;

      state.OfferID = OfferID;
    },
    setInvoiceID: (state, action) => {
      const { InvoiceID } = action.payload;

      state.InvoiceID = InvoiceID;
    },
    setInvoiceEmail: (state, action) => {
      const { InvoiceEmail } = action.payload;

      state.InvoiceEmail = InvoiceEmail;
    },
    setVerifyResendEmail: (state, action) => {
      const { VerifyResendEmail } = action.payload;

      state.VerifyResendEmail = VerifyResendEmail;
    },
    setVerifyResendTimeout: (state, action) => {
      const { Timeout } = action.payload;

      if (Timeout > 0) {
        state.VerifyResendTimeout = getUnixTime(new Date()) + Timeout;
      }
    },
    clearVerifyResendTimeout: (state) => {
      state.VerifyResendTimeout = null;
    },
    phoneVerify: (state, action) => {
      const { Timeout } = action.payload;

      if (Timeout > 0) {
        state.codeTimeout = getUnixTime(new Date()) + Timeout;
      }
    },
    phoneVerifyClear: (state) => {
      state.codeTimeout = null;
    },
  },
});

export const {
  phoneVerify,
  phoneVerifyClear,
  setVerifyResendEmail,
  setVerifyResendTimeout,
  setOfferID,
  setInvoiceID,
  setInvoiceEmail,
} = memberSlice.actions;

export const selectVerifyResendEmail = (state) => state.member.VerifyResendEmail;
export const selectVerifyResendTimeout = (state) => state.member.VerifyResendTimeout - getUnixTime(new Date());
export const selectOfferID = (state) => state.member.OfferID;
export const selectInvoiceID = (state) => state.member.InvoiceID;
export const selectInvoiceEmail = (state) => state.member.InvoiceEmail;
export const selectCodeTimeout = (state) => state.member.codeTimeout - getUnixTime(new Date());

export default memberSlice.reducer;