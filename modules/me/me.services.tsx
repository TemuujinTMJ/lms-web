import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@/boot/baseApi';

export const getUser = createAsyncThunk('me/user', async () => {
  const url = `/user`;
  return api.get(url).then((response) => response.data);
});
