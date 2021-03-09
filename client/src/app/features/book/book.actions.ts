import { createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_LINKS } from 'src/app/constants/links.constant';
import { request } from 'src/utils/request';
import {
  BookActionTypes as Types,
  GetBooksByGenreDto,
  IBook,
  PaginatedBooks,
  PaginationBooksDto,
} from './book.types';

export const fetchBooks = createAsyncThunk(
  Types.FETCH_BOOKS,
  async (input: GetBooksByGenreDto) => {
    const { genre, limit, page } = input;
    const data: PaginatedBooks = await request(
      `${SERVER_LINKS.bookGetByGenre}/${genre}?limit=${limit}&p=${page}`,
    );
    return data;
  },
);

export const fetchBookById = createAsyncThunk(Types.FETCH_BOOK, async (_id: string) => {
  const data: IBook = await request(`${SERVER_LINKS.bookGetById}/${_id}`);
  return data;
});

export const searchBooks = createAsyncThunk(Types.SEARCH_BOOKS, async (text: string) => {
  if (!text) return [];
  const books: IBook[] = await request(`${SERVER_LINKS.bookSearch}?text=${text}`);
  return books;
});

export const queryBooks = createAsyncThunk(
  Types.QUERY_BOOKS,
  async (input: PaginationBooksDto) => {
    const { text, limit, page } = input;
    const data: PaginatedBooks = await request(
      `${SERVER_LINKS.bookQuery}?text=${text}&limit=${limit}&p=${page}`,
    );
    return data;
  },
);
