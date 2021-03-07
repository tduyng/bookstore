import { User, UserSchema } from '@modules/user/user.schema';
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { Book, BookSchema } from './book.schema';
import { BookService } from './book.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Book.name, schema: BookSchema },
			{ name: User.name, schema: UserSchema },
		]),
	],
	controllers: [BookController],
	providers: [BookService],
	exports: [BookService],
})
export class BookModule {}
