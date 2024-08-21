import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/slices/authSlice";
import userSlice from "./features/slices/userSlice";
import alertSlice from "./features/slices/alertSlice";
import confirmationSlice from "./features/slices/confirmationSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    alert: alertSlice,
    confirmation: confirmationSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
