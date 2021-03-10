export interface IBook {
  _id: string;
  title: string;
  price: number;
  old_price?: number;
  imgURL?: string;
  author?: string;
  genre?: string;
}

export interface IBookReducer {
  status: 'success' | 'loading' | 'failed' | 'idle';
  books: IBook[];
  count: number;
  book: IBook | null;
  searchedBooks: IBook[];
  message: string;
}
export const BookActionTypes = {
  FETCH_BOOKS: 'feature/book/fetchBooks',
  FETCH_BOOK: 'feature/book/fetchBook',
  SEARCH_BOOKS: 'feature/book/searchBooks',
  QUERY_BOOKS: 'feature/books/queryBooks',
};
export interface GetBooksByGenreDto {
  genre: string;
  limit?: number;
  page?: number;
}
export interface PaginationBooksDto {
  text: string;
  limit?: number;
  page?: number;
}
export interface PaginatedBooks {
  books: IBook[];
  count?: number;
}
