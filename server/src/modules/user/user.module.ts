import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { Avatar, AvatarSchema } from './schemas/avatar.schema';
import { UserExitsValidator } from './decorators';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Avatar.name, schema: AvatarSchema },
		]),
	],
	controllers: [UserController],
	providers: [UserService, UserExitsValidator],
	exports: [UserService],
})
export class UserModule {}
