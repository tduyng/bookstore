import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Avatar, AvatarSchema } from './avatar.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Avatar.name, schema: AvatarSchema },
		]),
	],
	controllers: [],
	providers: [UserService],
})
export class UserModule {}
