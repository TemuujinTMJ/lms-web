import { createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';

import { api } from '@/boot/baseApi';

export const getAdminHome = createAsyncThunk('admin/home/get', async (data: object) => {
  const url = `/admin/home/get?${queryString.stringify(data)}`;
  return api.get(url).then((response) => response.data);
});

export const getAdminHomePie = createAsyncThunk('admin/home/get/pie', async (data: object) => {
  const url = `/admin/home/get/pie?${queryString.stringify(data)}`;
  return api.get(url).then((response) => response.data);
});

export const getAdminHomeChart = createAsyncThunk('admin/home/get/graph', async (data: object) => {
  const url = `/admin/home/get/graph?${queryString.stringify(data)}`;
  return api.get(url).then((response) => response.data);
});

export const getAdminLabUsage = createAsyncThunk('admin/laboratory/get/usage', async (data: object) => {
  const url = `/admin/laboratory/get/usage?${queryString.stringify(data)}`;
  return api.get(url).then((response) => response.data);
});
