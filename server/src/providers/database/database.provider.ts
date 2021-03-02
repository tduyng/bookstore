import mongoose from 'mongoose';
import { envConfig } from 'src/common/config/env.config';

export const databaseProviders = [
	{
		provide: 'DATABASE_CONNECTION',
		useFactory: (): Promise<typeof mongoose> => mongoose.connect(envConfig().mongodbUri),
	},
];
