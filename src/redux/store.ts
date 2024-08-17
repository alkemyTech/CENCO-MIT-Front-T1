import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/slices/authSlice";
import userSlice from "./features/slices/userSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice
        
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;