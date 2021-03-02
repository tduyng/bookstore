import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
	controllers: [],
	providers: [],
})
export class BookModule {}
