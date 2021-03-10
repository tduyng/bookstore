import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addToCart,
  fetchUser,
  login,
  logout,
  register,
  removeAllFromCart,
  removeFromCart,
  updateCart,
} from './user.actions';
import { CartItem, IPayloadAuth, IUser, IUserReducer } from './user.types';

const initialState: IUserReducer = {
  user: null,
  cart: [],
  isLoggedIn: false,
  accessToken: '',
  successMsg: '',
  errorMsg: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearStatus(state) {
      state.successMsg = '';
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action: PayloadAction<string>) => {
      state.successMsg = action.payload;
      state.errorMsg = '';
    });
    builder.addCase(register.rejected, (state, action) => {
      state.successMsg = '';
      state.errorMsg = action.payload as string;
      state.user = null;
      state.accessToken = '';
    });

    builder.addCase(login.fulfilled, (state, action: PayloadAction<IPayloadAuth>) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.accessToken = '';
      state.successMsg = '';
      state.errorMsg = action.payload as string;
    });

    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.user = null;
      state.errorMsg = action.payload as string;
    });

    builder.addCase(logout.fulfilled, state => {
      state.user = null;
      state.accessToken = '';
      state.isLoggedIn = false;
    });

    builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    });
    builder.addCase(updateCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    });
    builder.addCase(
      removeFromCart.fulfilled,
      (state, action: PayloadAction<CartItem[]>) => {
        state.cart = action.payload;
      },
    );
    builder.addCase(removeAllFromCart.fulfilled, state => {
      state.cart = [];
    });
  },
});

export const { clearStatus } = userSlice.actions;
export const userReducer = userSlice.reducer;
