import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { compareIds } from '@/utils/util';

import { deleteAdminLaboratory, getAdminLaboratory, postAdminLaboratory } from './laboratory.services';

interface iInitialState {
  loading: boolean;
  laboratories: Array<any>;
  submitLoading: boolean;
  teacher: any;
  visible: boolean;
}
const initialState: iInitialState = {
  loading: true,
  laboratories: [],
  submitLoading: false,
  teacher: {},
  visible: false,
};

const adminLaboratoryReducer = createSlice({
  name: 'adminLaboratoryReducer',
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
    builder.addCase(getAdminLaboratory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminLaboratory.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loading = false;
      if (result.success) {
        state.laboratories = result.laboratories || [];
      } else {
        state.laboratories = [];
      }
    });
    builder.addCase(getAdminLaboratory.rejected, (state) => {
      state.loading = false;
      state.laboratories = [];
    });
    // post teacher
    builder.addCase(postAdminLaboratory.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(postAdminLaboratory.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.submitLoading = false;
      if (result.success) {
        state.visible = false;
        state.teacher = {};
        if (result?._id) {
          state.laboratories = (state.laboratories || []).map((teacher) => {
            if (compareIds(result?.teacher?._id, teacher?._id)) {
              return {
                ...(teacher || {}),
                ...(result?.teacher || {}),
              };
            }
            return teacher;
          });
        } else {
          state.laboratories = [result?.teacher, ...(state.laboratories || [])];
        }
      }
    });
    builder.addCase(postAdminLaboratory.rejected, (state) => {
      state.laboratories = [];
      state.submitLoading = false;
    });
    // delete teacher
    builder.addCase(deleteAdminLaboratory.pending, (state, action: any) => {
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
    builder.addCase(deleteAdminLaboratory.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      if (result.success && result._id) {
        state.laboratories = state.laboratories?.filter((r) => r._id !== result._id);
        state.visible = false;
        state.teacher = {};
      } else {
        state.laboratories = state.laboratories?.map(function (r) {
          if (r._id === result._id) {
            return { ...r, loading: false };
          }
          return r;
        });
      }
    });
    builder.addCase(deleteAdminLaboratory.rejected, (state, action: any) => {
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

export const { closeModal, openModal } = adminLaboratoryReducer.actions;
export default adminLaboratoryReducer.reducer;
