export interface User {
  _id: string;
  email: string;
  username: string;
  thumbnail: string;
  cart: [];
  accessToken: string;
  refreshToken: string;
}
export interface RegisterUserDto {
  usernameOrEmail: string;
  password: string;
}
export const UserActionTypes = {
  SIGNUP: 'features/user/signup',
  LOGIN: 'features/user/login',
};
