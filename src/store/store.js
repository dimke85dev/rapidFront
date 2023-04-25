import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import postSlice from './features/post/postSlice';
import commentSlice from './features/comment/commentSlice';
import CarSlice from './features/car/carSlice';
import mainRepairSlice from './features/carRepair/mainRepairSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commentSlice,
    car: CarSlice,
    mainrepair: mainRepairSlice,
  },
});
