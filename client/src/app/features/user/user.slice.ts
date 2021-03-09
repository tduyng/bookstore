import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register } from './user.actions';
import { IPayloadAuth, IUserReducer } from './user.types';

const initialState: IUserReducer = {
  user: null,
  isLoggedIn: false,
  accessToken: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action: PayloadAction<IPayloadAuth>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
    });
    builder.addCase(register.rejected, state => {
      state.user = null;
      state.accessToken = '';
      state.isLoggedIn = false;
    });
  },
});

export const userReducer = userSlice.reducer;
