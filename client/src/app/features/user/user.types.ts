import { IBook } from '../book/book.types';

export interface IUser {
  _id: string;
  email: string;
  username: string;
  thumbnail?: string;
  cart?: CartItem[];
}
export type CartItem = Partial<IBook> & { total: number };
export interface LoginUserDto {
  usernameOrEmail: string;
  password: string;
}
export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}
export interface CartItemDto {
  _id: string;
  total?: number;
}
export const UserActionTypes = {
  REGISTER: 'features/user/signup',
  LOGIN: 'features/user/login',
  FETCH_USER: 'feature/user/fetchUser',
  ADD_TO_CART: 'feature/user/addToCart',
  UPDATE_CART: 'feature/user/updateCart',
  REMOVE_FROM_CART: 'feature/user/removeFromCart',
  REMOVE_ALL_FROM_CART: 'feature/user/removeAllFromCart',
};
export interface IUserReducer {
  user: IUser | null;
  cart: CartItem[];
  isLoggedIn: boolean;
  accessToken: string;
  successMsg: string;
  errorMsg: string;
}
export interface IPayloadAuth {
  accessToken: string;
  refreshToken?: string;
}
export interface IPayloadError {
  message: string;
}
