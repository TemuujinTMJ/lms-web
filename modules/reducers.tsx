import { combineReducers } from 'redux';

import adminHomeReducer from './admin/dashboard/dashboard.slicer';
import adminDeviceReducer from './admin/device/device.slicer';
import adminLaboratoryReducer from './admin/laboratory/laboratory.slicer';
import adminRequestReducer from './admin/order/order.slicer';
import adminTeacherReducer from './admin/teacher/teacher.slicer';
import adminUserReducer from './admin/user/user.slicer';
import authReducer from './auth/auth.slicer';
import teacherHomeReducer from './lab/dashboard/dashboard.slicer';
import teacherRequestReducer from './lab/order/order.slicer';
import userLaboratoryReducer from './user/laboratory/laboratory.slicer';
import userRequestReducer from './user/order/order.slicer';

const rootReducer = combineReducers({
  authReducer,
  adminTeacherReducer,
  adminUserReducer,
  adminLaboratoryReducer,
  adminDeviceReducer,
  userLaboratoryReducer,
  userRequestReducer,
  teacherRequestReducer,
  adminRequestReducer,
  adminHomeReducer,
  teacherHomeReducer,
});

export default rootReducer;
