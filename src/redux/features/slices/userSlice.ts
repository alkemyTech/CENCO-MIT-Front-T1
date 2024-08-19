import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../interfaces/User';
import { fetchAllUsers, searchUsers } from '../../../api/userServices';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'user/fetchUsers',
  async (_, thunkAPI) => {
    try {
      return await fetchAllUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching users');
    }
  }
);

export const searchUsersThunk = createAsyncThunk<User[], { name?: string; email?: string; country?: string }, { rejectValue: string }>(
  'user/searchUsers',
  async (query, thunkAPI) => {
    try {
      const result = await searchUsers(query); 
      if (result.length === 0) {
        return thunkAPI.rejectWithValue('No se encontraron usuarios');
      }
      return result; 
    } catch (error) {
      return thunkAPI.rejectWithValue('Error searching users');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.users = []; 
      })
      .addCase(searchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(searchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.users = [];
      });
  },
});


export const { clearUsers, setError } = userSlice.actions;
export default userSlice.reducer;
