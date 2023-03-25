import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { compareIds } from '@/utils/util';

import { deleteAdminDevice, getAdminDevice, postAdminDevice } from './device.services';

interface iInitialState {
  loading: boolean;
  devices: Array<any>;
  submitLoading: boolean;
  teacher: any;
  visible: boolean;
}
const initialState: iInitialState = {
  loading: true,
  devices: [],
  submitLoading: false,
  teacher: {},
  visible: false,
};

const adminDeviceReducer = createSlice({
  name: 'adminDeviceReducer',
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
    builder.addCase(getAdminDevice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminDevice.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loading = false;
      if (result.success) {
        state.devices = result.devices || [];
      } else {
        state.devices = [];
      }
    });
    builder.addCase(getAdminDevice.rejected, (state) => {
      state.loading = false;
      state.devices = [];
    });
    // post teacher
    builder.addCase(postAdminDevice.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(postAdminDevice.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.submitLoading = false;
      if (result.success) {
        state.visible = false;
        state.teacher = {};
        if (result?._id) {
          state.devices = (state.devices || []).map((teacher) => {
            if (compareIds(result?.teacher?._id, teacher?._id)) {
              return {
                ...(teacher || {}),
                ...(result?.teacher || {}),
              };
            }
            return teacher;
          });
        } else {
          state.devices = [result?.teacher, ...(state.devices || [])];
        }
      }
    });
    builder.addCase(postAdminDevice.rejected, (state) => {
      state.devices = [];
      state.submitLoading = false;
    });
    // delete teacher
    builder.addCase(deleteAdminDevice.pending, (state, action: any) => {
      const _id = action?.meta?.arg?._id || null;
      if (_id) {
        state.devices = state.devices?.map(function (r) {
          if (r._id === _id) {
            return { ...r, loading: true };
          }
          return r;
        });
      }
    });
    builder.addCase(deleteAdminDevice.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      if (result.success && result._id) {
        state.devices = state.devices?.filter((r) => r._id !== result._id);
        state.visible = false;
        state.teacher = {};
      } else {
        state.devices = state.devices?.map(function (r) {
          if (r._id === result._id) {
            return { ...r, loading: false };
          }
          return r;
        });
      }
    });
    builder.addCase(deleteAdminDevice.rejected, (state, action: any) => {
      const result = action.payload || {};
      if (result._id) {
        state.devices = state.devices?.map(function (r) {
          if (r._id === result._id) {
            return { ...r, loading: false };
          }
          return r;
        });
      }
    });
  },
});

export const { closeModal, openModal } = adminDeviceReducer.actions;
export default adminDeviceReducer.reducer;
