import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getAdminRequest, postAdminRequest } from './order.services';

interface iInitialState {
  loading: boolean;
  requests: Array<any>;
  submitLoading: boolean;
  teacher: any;
  visible: boolean;
}
const initialState: iInitialState = {
  loading: true,
  requests: [],
  submitLoading: false,
  teacher: {},
  visible: false,
};

const adminRequestReducer = createSlice({
  name: 'adminRequestReducer',
  initialState,

  reducers: {
    openModal: (state, teacher) => {
      state.visible = true;
      state.teacher = teacher;
    },
    closeModal: (state) => {
      state.visible = false;
      state.teacher = {};
    },
  },
  extraReducers: (builder) => {
    // get teacher
    builder.addCase(getAdminRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminRequest.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loading = false;
      if (result.success) {
        state.requests = result.requests || [];
      } else {
        state.requests = [];
      }
    });
    builder.addCase(getAdminRequest.rejected, (state) => {
      state.loading = false;
      state.requests = [];
    });
    // post teacher
    builder.addCase(postAdminRequest.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(postAdminRequest.fulfilled, (state) => {
      state.submitLoading = false;
    });
    builder.addCase(postAdminRequest.rejected, (state) => {
      state.requests = [];
      state.submitLoading = false;
    });
  },
});

export const { closeModal, openModal } = adminRequestReducer.actions;
export default adminRequestReducer.reducer;
