import { createSlice } from '@reduxjs/toolkit';
import { IBookReducer } from './book.types';

const initialState: IBookReducer = {
  books: [],
  book: null,
  searchedBooks: [],
  queriedBooks: [],
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const bookReducer = bookSlice.reducer;
