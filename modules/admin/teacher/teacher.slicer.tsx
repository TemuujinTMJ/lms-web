import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { compareIds } from '@/utils/util';

import { deleteAdminTeacher, getAdminTeacher, postAdminTeacher } from './teacher.services';

interface iInitialState {
  loading: boolean;
  teachers: Array<any>;
  submitLoading: boolean;
  teacher: any;
  visible: boolean;
}
const initialState: iInitialState = {
  loading: true,
  teachers: [],
  submitLoading: false,
  teacher: {},
  visible: false,
};

const adminTeacherReducer = createSlice({
  name: 'adminTeacherReducer',
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
    builder.addCase(getAdminTeacher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminTeacher.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loading = false;
      if (result.success) {
        state.teachers = result.teachers || [];
      } else {
        state.teachers = [];
      }
    });
    builder.addCase(getAdminTeacher.rejected, (state) => {
      state.loading = false;
      state.teachers = [];
    });
    // post teacher
    builder.addCase(postAdminTeacher.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(postAdminTeacher.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.submitLoading = false;
      if (result.success) {
        state.visible = false;
        state.teacher = {};
        if (result?._id) {
          state.teachers = (state.teachers || []).map((teacher) => {
            if (compareIds(result?.teacher?._id, teacher?._id)) {
              return {
                ...(teacher || {}),
                ...(result?.teacher || {}),
              };
            }
            return teacher;
          });
        } else {
          state.teachers = [result?.teacher, ...(state.teachers || [])];
        }
      }
    });
    builder.addCase(postAdminTeacher.rejected, (state) => {
      state.teachers = [];
      state.submitLoading = false;
    });
    // delete teacher
    builder.addCase(deleteAdminTeacher.pending, (state, action: any) => {
      const _id = action?.meta?.arg?._id || null;
      if (_id) {
        state.teachers = state.teachers?.map(function (r) {
          if (r._id === _id) {
            return { ...r, loading: true };
          }
          return r;
        });
      }
    });
    builder.addCase(deleteAdminTeacher.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      if (result.success && result._id) {
        state.teachers = state.teachers?.filter((r) => r._id !== result._id);
        state.visible = false;
        state.teacher = {};
      } else {
        state.teachers = state.teachers?.map(function (r) {
          if (r._id === result._id) {
            return { ...r, loading: false };
          }
          return r;
        });
      }
    });
    builder.addCase(deleteAdminTeacher.rejected, (state, action: any) => {
      const result = action.payload || {};
      if (result._id) {
        state.teachers = state.teachers?.map(function (r) {
          if (r._id === result._id) {
            return { ...r, loading: false };
          }
          return r;
        });
      }
    });
  },
});

export const { closeModal, openModal } = adminTeacherReducer.actions;
export default adminTeacherReducer.reducer;
