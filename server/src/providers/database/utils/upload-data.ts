import { Logger } from '@nestjs/common';
import { createConnection } from './create-connection';
import util from 'util';
import fs from 'fs';
import { Book, BookSchema } from '../../../modules/book/book.schema';
import mongoose from 'mongoose';
const readFile = util.promisify(fs.readFile);

async function uploadData() {
	try {
		await createConnection();
	} catch (error) {
		Logger.error(error.message);
		process.exit(1);
	}

	const BookModel = mongoose.model<Book>('books', BookSchema);

	const json = await readFile('./data.json', { encoding: 'utf8' });
	const { books } = JSON.parse(json);
	for (const book of books) {
		const { title, author, genre, price, old_price, imgURL } = book;
		await BookModel.create({
			title,
			author,
			genre,
			price: price * 1000,
			old_price: old_price * 1000,
			imgURL,
		});
	}

	Logger.log('Data created');
}

Promise.resolve(uploadData())
	.catch((err) => Logger.error(err))
	.finally(() => {
		process.exit(1);
	});
