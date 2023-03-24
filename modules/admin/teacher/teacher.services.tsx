import { createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';

import { api } from '@/boot/baseApi';

export const getAdminTeacher = createAsyncThunk('admin/teacher/get', async (data: object) => {
  const url = `/admin/teacher/get?${queryString.stringify(data)}`;
  return api.get(url).then((response) => response.data);
});

export const postAdminTeacher = createAsyncThunk('admin/teacher/post', async (data: object) => {
  const url = `/admin/teacher/post`;
  return api.post(url, data).then((response) => response.data);
});

export const deleteAdminTeacher = createAsyncThunk('admin/teacher/delete', async (data: object) => {
  const url = `/admin/teacher/delete`;
  return api.post(url, data).then((response) => response.data);
});
