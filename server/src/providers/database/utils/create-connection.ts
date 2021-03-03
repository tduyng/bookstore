import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';
import { Db } from 'mongodb';
import dotenv from 'dotenv';

export const createConnection = async (): Promise<Db> => {
	dotenv.config();
	console.log('mongo uri', process.env.MONGODB_URI);

	const mongoClient = await mongoose.connect(process.env.MONGODB_URI, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useNewUrlParser: true,
	});

	Logger.log('Database connected');
	return mongoClient.connection.db;
};
