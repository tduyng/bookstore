// import booksReducer from '../features/books/booksSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { bookReducer } from 'src/app/features/book/book.slice';
import { IBookReducer } from 'src/app/features/book/book.types';
import { userReducer } from 'src/app/features/user/user.slice';
import { IUserReducer } from 'src/app/features/user/user.types';

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['errorMsg', 'successMsg'],
};
export const rootReducers = {
  book: bookReducer,
  user: persistReducer(userPersistConfig, userReducer),
};
export interface AppState {
  user: IUserReducer;
  book: IBookReducer;
}
