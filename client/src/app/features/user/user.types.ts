export interface IUser {
  _id: string;
  email: string;
  username: string;
  thumbnail: string;
  cart: [];
}
export interface RegisterUserDto {
  usernameOrEmail: string;
  password: string;
}
export const UserActionTypes = {
  SIGNUP: 'features/user/signup',
  LOGIN: 'features/user/login',
};
export interface IUserReducer {
  user: IUser | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  errorMsg: string | null;
  successMsg: string | null;
}
