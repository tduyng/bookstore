import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BookService {
	constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

	// get books/genre/:genre
	// get books/search/:key
	// get books/query/:key
	// get books/:id
}
