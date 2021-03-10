import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_LINKS } from 'src/app/constants/links.constant';
import { request, requestWithAuth } from 'src/utils/request';
import {
  CartItem,
  CartItemDto,
  LoginUserDto,
  RegisterUserDto,
  UserActionTypes as Types,
} from './user.types';

export const register = createAsyncThunk(
  Types.REGISTER,
  async (registerInput: RegisterUserDto, { rejectWithValue }) => {
    try {
      const emailToken = await request(SERVER_LINKS.authRegister, {
        method: 'POST',
        body: JSON.stringify(registerInput),
      });
      return emailToken;
    } catch (error) {
      console.log('registerError', error);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUser = createAsyncThunk(
  Types.FETCH_USER,
  async (_, { rejectWithValue }) => {
    try {
      return await requestWithAuth(SERVER_LINKS.authMe);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const login = createAsyncThunk(
  Types.LOGIN,
  async (loginInput: LoginUserDto, { rejectWithValue }) => {
    try {
      const authToken = await request(SERVER_LINKS.authLogin, {
        method: 'POST',
        body: JSON.stringify(loginInput),
      });
      return authToken;
    } catch (error) {
      switch (error.status) {
        case '400':
          return rejectWithValue('Invalid credentials');
        default:
          return rejectWithValue(error.message);
      }
    }
  },
);

export const addToCart = createAsyncThunk(
  Types.ADD_TO_CART,
  async (item: CartItemDto) => {
    const cart: CartItem[] = await requestWithAuth(SERVER_LINKS.userAddToCart, {
      method: 'POST',
      body: JSON.stringify(item),
    });
    return cart;
  },
);

export const updateCart = createAsyncThunk(
  Types.UPDATE_CART,
  async (item: CartItemDto) => {
    const cart: CartItem[] = await requestWithAuth(SERVER_LINKS.userUpdateCart, {
      method: 'POST',
      body: JSON.stringify(item),
    });
    return cart;
  },
);

export const removeFromCart = createAsyncThunk(
  Types.REMOVE_FROM_CART,
  async (item: CartItemDto) => {
    const cart: CartItem[] = await requestWithAuth(SERVER_LINKS.userRemoveFromCart, {
      method: 'POST',
      body: JSON.stringify(item),
    });
    return cart;
  },
);

export const removeAllFromCart = createAsyncThunk(
  Types.REMOVE_ALL_FROM_CART,
  async () => {
    const cart: CartItem[] = await requestWithAuth(SERVER_LINKS.userRemoveAllFromCart, {
      method: 'POST',
    });
    return cart;
  },
);
