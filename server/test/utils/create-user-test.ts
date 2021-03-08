import { Logger } from '@nestjs/common';
import mongoose, { Connection } from 'mongoose';
import { User, UserSchema } from '@modules/user/user.schema';
import argon2 from 'argon2';
import { Book, BookSchema } from '@modules/book/book.schema';

export async function createUserTest(connection: Connection): Promise<Book | null> {
	if (!connection) {
		Logger.error('Connection null');
		return null;
	}

	const UserModel = mongoose.model<User>('users', UserSchema);
	const BookModel = mongoose.model<Book>('books', BookSchema);
	const hash = await argon2.hash('1234567');
	const data = {
		email: 'user-test@email.com',
		password: hash,
		username: 'user-test',
		cart: [],
	};

	await UserModel.findOneAndUpdate(
		{
			email: 'user-test@email.com',
		},
		data,
		{ new: true, upsert: true, setDefaultsOnInsert: true },
	);

	for (let i = 0; i < 10; ++i) {
		await BookModel.findOneAndUpdate(
			{
				title: `Book ${i + 1}`,
			},
			{
				genre: 'test',
				title: `Book ${i + 1}`,
				author: 'Unknown',
				price: 200,
				old_price: 100,
			},
			{ new: true, upsert: true },
		);
	}
	const firstBook: Book = await BookModel.findOne({ title: /^book 1$/i });
	return firstBook;
}
