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
  async (input: GetBooksByGenreDto, { rejectWithValue }) => {
    try {
      const { genre } = input;
      const limit: number = input.limit || 25;
      const page: number = input.page || 1;

      const data: PaginatedBooks = await request(
        `${SERVER_LINKS.bookGetByGenre}/${genre}?limit=${limit}&p=${page}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchBookById = createAsyncThunk(
  Types.FETCH_BOOK,
  async (_id: string, { rejectWithValue }) => {
    try {
      const data: IBook = await request(`${SERVER_LINKS.bookGetById}/${_id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const searchBooks = createAsyncThunk(
  Types.SEARCH_BOOKS,
  async (q: string, { rejectWithValue }) => {
    try {
      if (!q) return [];
      const books: IBook[] = await request(`${SERVER_LINKS.bookSearch}?q=${q}`);
      return books;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const queryBooks = createAsyncThunk(
  Types.QUERY_BOOKS,
  async (input: PaginationBooksDto, { rejectWithValue }) => {
    try {
      const { q } = input;
      const limit: number = input.limit || 25;
      const page: number = input.page || 1;

      const data: PaginatedBooks = await request(
        `${SERVER_LINKS.bookQuery}?q=${q}&limit=${limit}&p=${page}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
