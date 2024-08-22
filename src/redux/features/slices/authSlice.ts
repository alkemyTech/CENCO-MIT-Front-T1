import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import apiClient from "../../../api/api";
import { User, Role } from "../../../interfaces/User";
import { fetchProfile, fetchProfileById, updateProfile, updateProfileByAdmin } from "../../../api/userServices";

export interface AuthState {
  isAuthenticated: boolean;
  userById: User | null;
  user: User | null;
  token: string | null;
  role: Role | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: sessionStorage.getItem('token') !== null,
  user: null,
  userById: null,
  token: sessionStorage.getItem('token'),
  role: sessionStorage.getItem('role') as Role | null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk<
  { token: string; role: Role },
  { email: string; password: string },
  { rejectValue: string }
>(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await apiClient.post<{ data: string; message: string }>('/user/login', { email, password });

      if (response.data.data) {
        const decodedToken = jwtDecode<{ role: Role }>(response.data.data);
        return { token: response.data.data, role: decodedToken.role };
      } else {
        return thunkAPI.rejectWithValue('Login failed: No token provided');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Login failed: Unable to login');
    }
  }
);

export const fetchUserProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  'auth/fetchUserProfile',
  async (_, thunkAPI) => {
    try {
      const user = await fetchProfile();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch user profile');
    }
  }
);

export const fetchUserProfileById = createAsyncThunk<
  User | null,
  number,
  { rejectValue: string }
>(
  'auth/fetchUserProfileById',
  async (id, thunkAPI) => {
    try {
      const user = await fetchProfileById(id);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch user profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>(
  'auth/updateUserProfile',
  async (updatedUser, thunkAPI) => {
    try {
      const response = await updateProfile(updatedUser);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to update user profile');
    }
  }
);

export const updateUserByAdmin = createAsyncThunk<
  User,
  { id: number, filteredUser: Partial<User> },
  { rejectValue: string }
>(
  'auth/updateUserByAdmin',
  async ({id,filteredUser}, thunkAPI) => {
    try {
      const response = await updateProfileByAdmin(id, filteredUser);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to update user profile');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userById = null;
      state.token = null;
      state.role = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; role: Role }>) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.role = action.payload.role;

        sessionStorage.setItem('token', action.payload.token);
        sessionStorage.setItem('role', action.payload.role);

        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUserProfileById.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.userById = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateUserByAdmin.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch user profile';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to update user profile';
      })
      .addCase(updateUserByAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to update user profile';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserByAdmin.pending, (state) => {
        state.status = 'loading';
      })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
