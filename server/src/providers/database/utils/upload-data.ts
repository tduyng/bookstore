import { Logger } from '@nestjs/common';
import util from 'util';
import fs from 'fs';
import { Book, BookSchema } from '../../../modules/book/book.schema';
import mongoose, { Connection } from 'mongoose';
const readFile = util.promisify(fs.readFile);
import dotenv from 'dotenv';

let connection: Connection;
const createConnection = async (): Promise<Connection> => {
	dotenv.config();

	const mongoClient = await mongoose.connect(process.env.MONGODB_URI, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useNewUrlParser: true,
	});

	Logger.log('Database connected');
	connection = mongoClient.connection;
	return connection;
};

async function uploadData() {
	try {
		await createConnection();
	} catch (error) {
		Logger.error(error.message);
		process.exit(1);
	}
	Logger.log('Start uploading....');

	const BookModel = mongoose.model<Book>('books', BookSchema);
	const file = process.cwd() + `/src/providers/database/utils/data.json`;

	const json = await readFile(file, { encoding: 'utf8' });
	const { books } = JSON.parse(json);
	for (const book of books) {
		const { title, author, genre, imgURL } = book;
		const price = parseFloat(book.price.toString()) || 0;
		const old_price = parseFloat(book.old_price.toString()) || 0;
		await BookModel.create({
			title,
			author,
			genre,
			price: price,
			old_price: old_price,
			imgURL,
		});
	}

	Logger.log('Data created');
}

Promise.resolve(uploadData())
	.catch((err) => Logger.error(err))
	.finally(async () => {
		await connection.close();
		process.exit(1);
	});
