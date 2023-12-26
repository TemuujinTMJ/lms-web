import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/boot/baseApi';

export const getTeacherDevice = createAsyncThunk('teacher/device/get', async (data: object) => {
  const url = `/teacher/device/get`;
  return api.post(url, data).then((response) => response.data);
});

export const postTeacherDevice = createAsyncThunk('teacher/device/post', async (data: object) => {
  const url = `/teacher/device/post`;
  return api.post(url, data).then((response) => response.data);
});

export const deleteTeacherDevice = createAsyncThunk('teacher/device/delete', async (data: object) => {
  const url = `/teacher/device/delete`;
  return api.post(url, data).then((response) => response.data);
});
