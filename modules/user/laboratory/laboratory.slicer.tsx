import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getUserLaboratory,
  postUserDevoceOrders,
  postUserLaboratoryDeviceOrder,
  postUserLaboratorySingle,
} from './laboratory.services';

interface iInitialState {
  loading: boolean;
  laboratories: Array<any>;
  laboratory: any;
  submitLoading: boolean;
  orderLoading: boolean;
  orders: Array<any>;
}
const initialState: iInitialState = {
  loading: true,
  laboratories: [],
  submitLoading: false,
  orderLoading: false,
  orders: [],
  laboratory: {},
};

const userLaboratoryReducer = createSlice({
  name: 'userLaboratoryReducer',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    // get labs
    builder.addCase(getUserLaboratory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserLaboratory.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loading = false;
      if (result.success) {
        state.laboratories = result.laboratories || [];
      } else {
        state.laboratories = [];
      }
    });
    builder.addCase(getUserLaboratory.rejected, (state) => {
      state.loading = false;
      state.laboratories = [];
    });
    // get laboratory
    builder.addCase(postUserLaboratorySingle.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(postUserLaboratorySingle.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.submitLoading = false;
      if (result.success) {
        state.laboratory = result?.laboratory;
      }
    });
    builder.addCase(postUserLaboratorySingle.rejected, (state) => {
      state.laboratory = {};
      state.submitLoading = false;
    });
    // delete teacher
    builder.addCase(postUserDevoceOrders.pending, (state) => {
      state.orderLoading = true;
    });
    builder.addCase(postUserDevoceOrders.fulfilled, (state, action: PayloadAction<any>) => {
      state.orderLoading = false;
      const result = action.payload || {};
      if (result.success) {
        state.orders = result?.orders;
      }
    });
    builder.addCase(postUserDevoceOrders.rejected, (state) => {
      state.orderLoading = false;
    });
    // delete teacher
    builder.addCase(postUserLaboratoryDeviceOrder.pending, (state, action: any) => {
      const _id = action?.meta?.arg?._id || null;
      if (_id) {
        state.laboratories = state.laboratories?.map(function (r) {
          if (r._id === _id) {
            return { ...r, loading: true };
          }
          return r;
        });
      }
    });
    builder.addCase(postUserLaboratoryDeviceOrder.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      if (result.success && result._id) {
        state.laboratories = state.laboratories?.filter((r) => r._id !== result._id);
      } else {
        state.laboratories = state.laboratories?.map(function (r) {
          if (r._id === result._id) {
            return { ...r, loading: false };
          }
          return r;
        });
      }
    });
    builder.addCase(postUserLaboratoryDeviceOrder.rejected, (state, action: any) => {
      const result = action.payload || {};
      if (result._id) {
        state.laboratories = state.laboratories?.map(function (r) {
          if (r._id === result._id) {
            return { ...r, loading: false };
          }
          return r;
        });
      }
    });
  },
});

export default userLaboratoryReducer.reducer;
