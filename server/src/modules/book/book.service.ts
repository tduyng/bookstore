import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BookService {
	constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

	public async findOne(filter: FilterQuery<Book>) {
		return this.bookModel.findOne(filter).lean();
	}

	public async findById(id: string) {
		return this.bookModel.findById(id).lean();
	}

	// get books/genre/:genre
	// get books/search/:key
	// get books/query/:key
	// get books/:id
}
