import { createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';

import { api } from '@/boot/baseApi';

export const getAdminDevice = createAsyncThunk('admin/device/get', async (data: object) => {
  const url = `/admin/device/get?${queryString.stringify(data)}`;
  return api.post(url, data).then((response) => response.data);
});

export const postAdminDevice = createAsyncThunk('admin/device/post', async (data: object) => {
  const url = `/admin/device/post`;
  return api.post(url, data).then((response) => response.data);
});

export const deleteAdminDevice = createAsyncThunk('admin/device/delete', async (data: object) => {
  const url = `/admin/device/delete`;
  return api.post(url, data).then((response) => response.data);
});
