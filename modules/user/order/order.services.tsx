import { createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';

import { api } from '@/boot/baseApi';

export const getUserRequest = createAsyncThunk('customer/request/get', async (data: object) => {
  const url = `/customer/request/get?${queryString.stringify(data)}`;
  return api.post(url, data).then((response) => response.data);
});

export const deleteUserRequest = createAsyncThunk('customer/request/delete', async (data: object) => {
  const url = `/customer/request/delete`;
  return api.post(url, data).then((response) => response.data);
});
