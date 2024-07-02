// client/src/features/auth/transactionsSlice.jsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/transactions?accountId=${accountId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export default transactionsSlice.reducer;
