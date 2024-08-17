import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import apiClient from "../../../api/api";

export interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    username: null,
    token: null,
    status: 'idle',
    error: null,
}

export const loginUser: any = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: { email: string; password: string }) => {
        const response = await apiClient.post('/user/login', { email, password });
        return response.data; // Asume que la respuesta contiene { token, username }
        // console.log(email)
    }
);

export const authSlice: any = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.username = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; username: string }>) => {
                state.isAuthenticated = true;
                state.username = action.payload.username;
                state.token = action.payload.token;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Login failed';
            });
    },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer