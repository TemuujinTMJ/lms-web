import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getAdminHome, getAdminHomeChart, getAdminHomePie, getAdminLabUsage } from './dashboard.services';

interface iInitialState {
  loading: boolean;
  loadingLab: boolean;
  loadingPie: boolean;
  loadingchart: boolean;
  mostDevices: Array<any>;
  labUsages: Array<any>;

  users: number;
  requests: number;
  devices: number;
  requestedDevices: number;
  activeDevices: number;
}
const initialState: iInitialState = {
  loading: true,
  loadingLab: false,
  loadingPie: false,
  loadingchart: false,
  mostDevices: [],
  labUsages: [],

  users: 0,
  requests: 0,
  devices: 0,
  requestedDevices: 0,
  activeDevices: 0,
};

const adminHomeReducer = createSlice({
  name: 'adminHomeReducer',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    // get home
    builder.addCase(getAdminHome.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAdminHome.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loading = false;
      if (result.success) {
        state.users = result.users || 0;
        state.requests = result.requests || 0;
        state.devices = result.devices || 0;
      } else {
        state.users = 0;
        state.devices = 0;
        state.requests = 0;
      }
    });
    builder.addCase(getAdminHome.rejected, (state) => {
      state.loading = false;
      state.users = 0;
      state.devices = 0;
      state.requests = 0;
    });
    // get pie
    builder.addCase(getAdminHomePie.pending, (state) => {
      state.loadingPie = true;
    });
    builder.addCase(getAdminHomePie.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loadingPie = false;
      if (result.success) {
        state.requestedDevices = result.requestedDevices || 0;
        state.activeDevices = result.activeDevices || 0;
      } else {
        state.activeDevices = 0;
        state.requestedDevices = 0;
      }
    });
    builder.addCase(getAdminHomePie.rejected, (state) => {
      state.loadingPie = false;
      state.activeDevices = 0;
      state.requestedDevices = 0;
    });
    // get chart
    builder.addCase(getAdminHomeChart.pending, (state) => {
      state.loadingchart = true;
    });
    builder.addCase(getAdminHomeChart.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loadingchart = false;
      if (result.success) {
        state.mostDevices = result.mostDevices || [];
      } else {
        state.mostDevices = [];
      }
    });
    builder.addCase(getAdminHomeChart.rejected, (state) => {
      state.loadingchart = false;
      state.mostDevices = [];
    });
    // get labUsage
    builder.addCase(getAdminLabUsage.pending, (state) => {
      state.loadingLab = true;
    });
    builder.addCase(getAdminLabUsage.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loadingLab = false;
      if (result.success) {
        state.labUsages = result.laboratories || [];
      } else {
        state.labUsages = [];
      }
    });
    builder.addCase(getAdminLabUsage.rejected, (state) => {
      state.loadingLab = false;
      state.labUsages = [];
    });
  },
});

export default adminHomeReducer.reducer;
