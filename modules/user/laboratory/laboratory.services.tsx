import { createAsyncThunk } from '@reduxjs/toolkit';
import queryString from 'query-string';

import { api } from '@/boot/baseApi';

export const getUserLaboratory = createAsyncThunk('customer/laboratory/get', async (data: object) => {
  const url = `/customer/laboratory/get?${queryString.stringify(data)}`;
  return api.post(url, data).then((response) => response.data);
});

export const postUserLaboratorySingle = createAsyncThunk('customer/laboratory/get/single', async (data: object) => {
  const url = `/customer/laboratory/get/single?${queryString.stringify(data)}`;
  return api.get(url).then((response) => response.data);
});

export const postUserDevoceOrders = createAsyncThunk('customer/laboratory/device/orders', async (data: object) => {
  const url = `/customer/laboratory/device/orders?${queryString.stringify(data)}`;
  return api.get(url).then((response) => response.data);
});

export const postUserLaboratoryDeviceOrder = createAsyncThunk(
  'customer/laboratory/device/order',
  async (data: object) => {
    const url = `/customer/laboratory/device/order`;
    return api.post(url, data).then((response) => response.data);
  },
);
