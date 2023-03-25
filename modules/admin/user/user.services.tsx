import { createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';

import { api } from '@/boot/baseApi';

export const getAdminUser = createAsyncThunk('admin/user/get', async (data: object) => {
  const url = `/admin/user/get?${queryString.stringify(data)}`;
  return api.post(url, data).then((response) => response.data);
});

export const postAdminUser = createAsyncThunk('admin/user/post', async (data: object) => {
  const url = `/admin/user/post`;
  return api.post(url, data).then((response) => response.data);
});

export const deleteAdminUser = createAsyncThunk('admin/user/delete', async (data: object) => {
  const url = `/admin/user/delete`;
  return api.post(url, data).then((response) => response.data);
});
