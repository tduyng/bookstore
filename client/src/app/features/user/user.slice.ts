import { createSlice } from '@reduxjs/toolkit';
import { signup } from './user.actions';
import { IUserReducer } from './user.types';

const initialState: IUserReducer = {
  user: null,
  isLoggedIn: false,
  accessToken: null,
  errorMsg: '',
  successMsg: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearStatus(state) {
      state.errorMsg = '';
      state.successMsg = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.successMsg = action.payload;
      state.errorMsg = '';
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.successMsg = '';
      state.errorMsg = action.payload as string;
    });
  },
});

export const { clearStatus } = userSlice.actions;
export const userReducer = userSlice.reducer;
