import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/boot/baseApi';

export const getAdminRequest = createAsyncThunk('admin/request/get', async (data: object) => {
  const url = `/admin/request/get`;
  return api.post(url, data).then((response) => response.data);
});

export const postAdminRequest = createAsyncThunk('admin/request/post', async (data: object) => {
  const url = `/admin/request/post`;
  return api.post(url, data).then((response) => response.data);
});
