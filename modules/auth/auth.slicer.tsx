import { createSlice } from '@reduxjs/toolkit';

import { login, register } from './auth.services';

interface iInitialState {
  loadingLogin: boolean;
  loadingSignup: boolean;
}
const initialState: iInitialState = {
  loadingLogin: false,
  loadingSignup: false,
};

const authReducer = createSlice({
  name: 'authReducer',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.loadingSignup = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loadingSignup = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loadingSignup = false;
    });
    // register
    builder.addCase(register.pending, (state) => {
      state.loadingLogin = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loadingLogin = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.loadingLogin = false;
    });
  },
});

export default authReducer.reducer;
