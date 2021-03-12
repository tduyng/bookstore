import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { bookReducer } from 'src/app/features/book/book.slice';
import { uiReducer } from 'src/app/features/ui/ui.slice';
import { userReducer } from 'src/app/features/user/user.slice';

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['errorMsg', 'successMsg'],
};
export const rootReducer = combineReducers({
  book: bookReducer,
  user: persistReducer(userPersistConfig, userReducer),
  ui: uiReducer,
});
export type AppState = ReturnType<typeof rootReducer>;
// export interface AppState {
//   user: IUserReducer;
//   book: IBookReducer;
// }
