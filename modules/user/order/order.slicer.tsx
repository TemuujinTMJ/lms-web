import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { deleteUserRequest, getUserRequest } from './order.services';

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

const userRequestReducer = createSlice({
  name: 'userRequestReducer',
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
    builder.addCase(getUserRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserRequest.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loading = false;
      if (result.success) {
        state.requests = result.requests || [];
      } else {
        state.requests = [];
      }
    });
    builder.addCase(getUserRequest.rejected, (state) => {
      state.loading = false;
      state.requests = [];
    });
    // post teacher
    builder.addCase(deleteUserRequest.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(deleteUserRequest.fulfilled, (state) => {
      state.submitLoading = false;
    });
    builder.addCase(deleteUserRequest.rejected, (state) => {
      state.requests = [];
      state.submitLoading = false;
    });
  },
});

export const { closeModal, openModal } = userRequestReducer.actions;
export default userRequestReducer.reducer;
