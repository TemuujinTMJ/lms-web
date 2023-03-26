import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getTeacherRequest, postTeacherRequest } from './order.services';

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

const teacherRequestReducer = createSlice({
  name: 'teacherRequestReducer',
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
    builder.addCase(getTeacherRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTeacherRequest.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loading = false;
      if (result.success) {
        state.requests = result.requests || [];
      } else {
        state.requests = [];
      }
    });
    builder.addCase(getTeacherRequest.rejected, (state) => {
      state.loading = false;
      state.requests = [];
    });
    // post teacher
    builder.addCase(postTeacherRequest.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(postTeacherRequest.fulfilled, (state) => {
      state.submitLoading = false;
    });
    builder.addCase(postTeacherRequest.rejected, (state) => {
      state.requests = [];
      state.submitLoading = false;
    });
  },
});

export const { closeModal, openModal } = teacherRequestReducer.actions;
export default teacherRequestReducer.reducer;
