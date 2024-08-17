import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice
    }
})

export default store;

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch