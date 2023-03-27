import { createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';

import { api } from '@/boot/baseApi';

export const getTeacherHomeTable = createAsyncThunk('teacher/laboratory/get/table', async (data: object) => {
  const url = `/teacher/laboratory/get/table?${queryString.stringify(data)}`;
  return api.get(url).then((response) => response.data);
});

export const getTeacherHomePie = createAsyncThunk('teacher/home/get/pie', async (data: object) => {
  const url = `/teacher/home/get/pie?${queryString.stringify(data)}`;
  return api.get(url).then((response) => response.data);
});

export const getTeacherHomeChart = createAsyncThunk('teacher/laboratory/get/graph', async (data: object) => {
  const url = `/teacher/laboratory/get/graph?${queryString.stringify(data)}`;
  return api.get(url).then((response) => response.data);
});

export const getTeacherLabUsage = createAsyncThunk('teacher/laboratory/get/usage', async (data: object) => {
  const url = `/teacher/laboratory/get/usage?${queryString.stringify(data)}`;
  return api.get(url).then((response) => response.data);
});
