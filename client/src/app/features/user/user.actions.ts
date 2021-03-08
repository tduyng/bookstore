import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from 'src/utils/request';
import { RegisterUserDto, UserActionTypes as Types } from './user.types';

export const signup = createAsyncThunk(
  Types.SIGNUP,
  async (userData: RegisterUserDto, { rejectWithValue }) => {
    try {
      const data = request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
