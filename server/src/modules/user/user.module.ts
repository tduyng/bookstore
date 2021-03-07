import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserExitsValidator } from './decorators';
import { Book, BookSchema } from '@modules/book/book.schema';
import { BookService } from '@modules/book/book.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Book.name, schema: BookSchema },
		]),
	],
	controllers: [UserController],
	providers: [UserService, UserExitsValidator, BookService],
	exports: [UserService],
})
export class UserModule {}
