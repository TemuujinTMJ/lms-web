import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { compareIds } from '@/utils/util';

import { deleteAdminUser, getAdminUser, postAdminUser } from './user.services';

interface iInitialState {
  loading: boolean;
  users: Array<any>;
  submitLoading: boolean;
  teacher: any;
  visible: boolean;
}
const initialState: iInitialState = {
  loading: true,
  users: [],
  submitLoading: false,
  teacher: {},
  visible: false,
};

const adminUserReducer = createSlice({
  name: 'adminUserReducer',
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
    builder.addCase(getAdminUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminUser.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loading = false;
      if (result.success) {
        state.users = result.users.filter((item) => item.role === 'customer') || [];
      } else {
        state.users = [];
      }
    });
    builder.addCase(getAdminUser.rejected, (state) => {
      state.loading = false;
      state.users = [];
    });
    // post teacher
    builder.addCase(postAdminUser.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(postAdminUser.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.submitLoading = false;
      if (result.success) {
        state.visible = false;
        state.teacher = {};
        if (result?._id) {
          state.users = (state.users || []).map((teacher) => {
            if (compareIds(result?.teacher?._id, teacher?._id)) {
              return {
                ...(teacher || {}),
                ...(result?.teacher || {}),
              };
            }
            return teacher;
          });
        } else {
          state.users = [result?.teacher, ...(state.users || [])];
        }
      }
    });
    builder.addCase(postAdminUser.rejected, (state) => {
      state.users = [];
      state.submitLoading = false;
    });
    // delete teacher
    builder.addCase(deleteAdminUser.pending, (state, action: any) => {
      const _id = action?.meta?.arg?._id || null;
      if (_id) {
        state.users = state.users?.map(function (r) {
          if (r._id === _id) {
            return { ...r, loading: true };
          }
          return r;
        });
      }
    });
    builder.addCase(deleteAdminUser.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      if (result.success && result._id) {
        state.users = state.users?.filter((r) => r._id !== result._id);
        state.visible = false;
        state.teacher = {};
      } else {
        state.users = state.users?.map(function (r) {
          if (r._id === result._id) {
            return { ...r, loading: false };
          }
          return r;
        });
      }
    });
    builder.addCase(deleteAdminUser.rejected, (state, action: any) => {
      const result = action.payload || {};
      if (result._id) {
        state.users = state.users?.map(function (r) {
          if (r._id === result._id) {
            return { ...r, loading: false };
          }
          return r;
        });
      }
    });
  },
});

export const { closeModal, openModal } = adminUserReducer.actions;
export default adminUserReducer.reducer;
