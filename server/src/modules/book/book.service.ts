import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Book } from './book.schema';
import { PaginatedBooksDto } from './dto/paginated-books.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class BookService {
	constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

	public async findOne(filter: FilterQuery<Book>) {
		const book: Book = await this.bookModel.findOne(filter).lean();
		return book;
	}

	public async findById(id: string) {
		const book: Book = await this.bookModel.findById(id).lean();
		return book;
	}

	// get books/genre/:genre
	public async findManyByGenre(
		genre: string,
		pagination?: PaginationDto,
	): Promise<PaginatedBooksDto> {
		const count = await this.bookModel.countDocuments({ genre });
		let books: Book[];
		if (!pagination) {
			books = await this.bookModel.find({}).lean();
		} else {
			const { limit, page } = pagination;
			books = await this.bookModel
				.find({ genre: genre })
				.skip((page - 1) * limit)
				.limit(limit)
				.lean();
		}
		return { count, books };
	}
	// get books/search/:key

	public async searchBooks(q: string): Promise<Book[]> {
		const books: Book[] = await this.bookModel
			.find({ $text: { $search: `\"${q}\"` } })
			.limit(10)
			.lean();
		return books;
	}
	// get books/query/:key
	public async queryBooks(
		q: string,
		pagination?: PaginationDto,
	): Promise<PaginatedBooksDto> {
		const count = await this.bookModel.countDocuments({
			$text: { $search: `\"${q}\"` },
		});
		const limit = pagination?.limit || 25;
		const page = pagination?.page || 1;

		const books: Book[] = await this.bookModel
			.find({ $text: { $search: `\"${q}\"` } })
			.skip((page - 1) * limit)
			.limit(limit)
			.lean();

		return { count, books };
	}
}
