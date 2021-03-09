import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_LINKS } from 'src/app/constants/links.constant';
import { request } from 'src/utils/request';

export const searchBooks = createAsyncThunk('books/searchBooks', async (q: string) => {
  if (!q) {
    return { searchedBooks: [] };
  }
  const res = await request(`${SERVER_LINKS.bookSearch}/${q}`);
  return res.data;
});
