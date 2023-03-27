import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUser } from './me.services';

interface iInitialState {
  loading: boolean;
  user: any;
}
const initialState: iInitialState = {
  loading: false,
  user: {},
};

const meReducer = createSlice({
  name: 'meReducer',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    // get home
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loading = false;
      if (result.success) {
        state.user = result.user || {};
      }
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default meReducer.reducer;
