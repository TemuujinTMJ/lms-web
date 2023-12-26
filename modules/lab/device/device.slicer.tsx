import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { compareIds } from '@/utils/util';

import { deleteTeacherDevice, getTeacherDevice, postTeacherDevice } from './device.services';

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

const teacherDeviceReducer = createSlice({
  name: 'teacherDeviceReducer',
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
    builder.addCase(getTeacherDevice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTeacherDevice.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loading = false;
      if (result.success) {
        state.devices = result.devices || [];
      } else {
        state.devices = [];
      }
    });
    builder.addCase(getTeacherDevice.rejected, (state) => {
      state.loading = false;
      state.devices = [];
    });
    // post teacher
    builder.addCase(postTeacherDevice.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(postTeacherDevice.fulfilled, (state, action: PayloadAction<any>) => {
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
    builder.addCase(postTeacherDevice.rejected, (state) => {
      state.devices = [];
      state.submitLoading = false;
    });
    // delete teacher
    builder.addCase(deleteTeacherDevice.pending, (state, action: any) => {
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
    builder.addCase(deleteTeacherDevice.fulfilled, (state, action: PayloadAction<any>) => {
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
    builder.addCase(deleteTeacherDevice.rejected, (state, action: any) => {
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

export const { closeModal, openModal } = teacherDeviceReducer.actions;
export default teacherDeviceReducer.reducer;
