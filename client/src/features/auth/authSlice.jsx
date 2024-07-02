// client/src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', credentials);
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/profile', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userProfile = response.data.body;
      userProfile.accounts = userProfile.email === 'tony@stark.com' ? [
        { type: 'Checking', number: 'x8349', balance: '2,082.79' },
        { type: 'Savings', number: 'x6712', balance: '10,928.42' },
        { type: 'Credit Card', number: 'x8349', balance: '184.30' }
      ] : [
        { type: 'Checking', number: 'x1234', balance: '3,500.00' },
        { type: 'Savings', number: 'x5678', balance: '5,000.00' },
        { type: 'Credit Card', number: 'x9101', balance: '200.00' }
      ];
      return userProfile;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userDetails, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.put('http://localhost:3001/api/v1/user/profile', userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.status = 'succeeded';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
