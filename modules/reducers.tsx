import { combineReducers } from 'redux';

import adminDeviceReducer from './admin/device/device.slicer';
import adminLaboratoryReducer from './admin/laboratory/laboratory.slicer';
import adminTeacherReducer from './admin/teacher/teacher.slicer';
import adminUserReducer from './admin/user/user.slicer';
import authReducer from './auth/auth.slicer';

const rootReducer = combineReducers({
  authReducer,
  adminTeacherReducer,
  adminUserReducer,
  adminLaboratoryReducer,
  adminDeviceReducer,
});

export default rootReducer;
