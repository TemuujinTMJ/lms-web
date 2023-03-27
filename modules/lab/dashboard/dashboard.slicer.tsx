import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getTeacherHomeChart, getTeacherHomePie, getTeacherHomeTable, getTeacherLabUsage } from './dashboard.services';

interface iInitialState {
  loading: boolean;
  loadingLab: boolean;
  loadingPie: boolean;
  loadingchart: boolean;
  mostDevices: Array<any>;
  labUsages: Array<any>;
  activeOrders: Array<any>;

  activeDevices: number;
  requests: number;
  devices: number;
  requestedDevices: number;
}
const initialState: iInitialState = {
  loading: true,
  loadingLab: false,
  loadingPie: false,
  loadingchart: false,
  mostDevices: [],
  labUsages: [],
  activeOrders: [],

  activeDevices: 0,
  requests: 0,
  devices: 0,
  requestedDevices: 0,
};

const teacherHomeReducer = createSlice({
  name: 'teacherHomeReducer',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    // get home
    builder.addCase(getTeacherHomeTable.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTeacherHomeTable.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loading = false;
      if (result.success) {
        state.activeOrders = result.activeOrders || [];
        state.devices = result.devices || 0;
      } else {
        state.activeOrders = [];
        state.devices = 0;
      }
    });
    builder.addCase(getTeacherHomeTable.rejected, (state) => {
      state.loading = false;
      state.activeOrders = [];
      state.devices = 0;
    });
    // get pie
    builder.addCase(getTeacherHomePie.pending, (state) => {
      state.loadingPie = true;
    });
    builder.addCase(getTeacherHomePie.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loadingPie = false;
      if (result.success) {
        state.requestedDevices = result.requestedDevices || 0;
      } else {
        state.activeDevices = 0;
      }
    });
    builder.addCase(getTeacherHomePie.rejected, (state) => {
      state.loadingPie = false;
      state.requestedDevices = 0;
    });
    // get chart
    builder.addCase(getTeacherHomeChart.pending, (state) => {
      state.loadingchart = true;
    });
    builder.addCase(getTeacherHomeChart.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loadingchart = false;
      if (result.success) {
        state.mostDevices = result.graphValues || [];
      } else {
        state.mostDevices = [];
      }
    });
    builder.addCase(getTeacherHomeChart.rejected, (state) => {
      state.loadingchart = false;
      state.mostDevices = [];
    });
    // get labUsage
    builder.addCase(getTeacherLabUsage.pending, (state) => {
      state.loadingLab = true;
    });
    builder.addCase(getTeacherLabUsage.fulfilled, (state, action: PayloadAction<any>) => {
      const result = action.payload || {};
      state.loadingLab = false;
      if (result.success) {
        state.labUsages = result.laboratories || [];
      } else {
        state.labUsages = [];
      }
    });
    builder.addCase(getTeacherLabUsage.rejected, (state) => {
      state.loadingLab = false;
      state.labUsages = [];
    });
  },
});

export default teacherHomeReducer.reducer;
