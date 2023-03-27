import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/boot/baseApi';

export const getAdminLaboratory = createAsyncThunk('admin/laboratory/get', async (data: object) => {
  const url = `/admin/laboratory/get`;
  return api.post(url, data).then((response) => response.data);
});

export const postAdminLaboratory = createAsyncThunk('admin/laboratory/post', async (data: object) => {
  const url = `/admin/laboratory/post`;
  return api.post(url, data).then((response) => response.data);
});

export const deleteAdminLaboratory = createAsyncThunk('admin/laboratory/delete', async (data: object) => {
  const url = `/admin/laboratory/delete`;
  return api.post(url, data).then((response) => response.data);
});
