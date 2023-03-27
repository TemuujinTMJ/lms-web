import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/boot/baseApi';

export const getTeacherRequest = createAsyncThunk('teacher/request/get', async (data: object) => {
  const url = `/teacher/request/get`;
  return api.post(url, data).then((response) => response.data);
});

export const postTeacherRequest = createAsyncThunk('teacher/request/post', async (data: object) => {
  const url = `/teacher/request/post`;
  return api.post(url, data).then((response) => response.data);
});
