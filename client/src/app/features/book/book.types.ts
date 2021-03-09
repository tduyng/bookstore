export interface IBook {
  _id: string;
  title: string;
  price: string | number;
  old_price?: string | number;
  imgURL?: string;
  author?: string;
}

export interface IBookReducer {
  books: IBook[];
  book: IBook | null;
  searchedBooks: IBook[];
  queriedBooks: IBook[];
}
