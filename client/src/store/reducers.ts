// import booksReducer from '../features/books/booksSlice';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { bookReducer } from 'src/app/features/book/book.slice';
import { userReducer } from 'src/app/features/user/user.slice';

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['errorMsg', 'successMsg'],
};
export const rootReducer = combineReducers({
  book: bookReducer,
  user: persistReducer(userPersistConfig, userReducer),
});
// export interface AppState {
//   user: IUserReducer;
//   book: IBookReducer;
// }
export type AppState = ReturnType<typeof rootReducer>;
