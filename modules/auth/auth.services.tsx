import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/boot/baseApi';

export const login = createAsyncThunk('/auth/login', async (data: object) => {
  const url = `/auth/login`;
  return api.post(url, data).then((response) => response.data);
});

export const register = createAsyncThunk('/auth/register', async (data: object) => {
  const url = `/auth/register`;
  return api.post(url, data).then((response) => response.data);
});
