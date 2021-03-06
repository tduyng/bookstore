import { Book } from '../book.schema';

export class PaginatedBooksDto {
	count: number;
	books: Book[];
}
