import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBookById, fetchBooks, queryBooks, searchBooks } from './book.actions';
import { IBook, IBookReducer, PaginatedBooks } from './book.types';

const initialState: IBookReducer = {
  status: 'loading',
  books: [],
  count: 0,
  book: null,
  searchedBooks: [],
  message: '',
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBooks.pending, state => {
      state.message = '';
      state.status = 'loading';
    });
    builder.addCase(
      fetchBooks.fulfilled,
      (state, action: PayloadAction<PaginatedBooks>) => {
        state.status = 'success';
        state.books = action.payload.books;
        state.count = action.payload.count || 0;
      },
    );

    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.books = [];
      state.status = 'failed';
      state.message = action.payload as string;
    });

    builder.addCase(fetchBookById.pending, state => {
      state.message = '';
      state.status = 'loading';
    });
    builder.addCase(fetchBookById.fulfilled, (state, action: PayloadAction<IBook>) => {
      state.book = action.payload;
      state.status = 'success';
    });

    builder.addCase(fetchBookById.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.payload as string;
    });

    builder.addCase(searchBooks.fulfilled, (state, action: PayloadAction<IBook[]>) => {
      state.searchedBooks = action.payload;
    });
    builder.addCase(queryBooks.pending, state => {
      state.message = '';
      state.status = 'loading';
    });
    builder.addCase(
      queryBooks.fulfilled,
      (state, action: PayloadAction<PaginatedBooks>) => {
        state.status = 'success';
        state.books = action.payload.books;
        state.count = action.payload.count || 0;
      },
    );
    builder.addCase(queryBooks.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.payload as string;
    });
  },
});

export const bookReducer = bookSlice.reducer;
