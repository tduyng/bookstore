import { User, UserSchema } from '@modules/user/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvatarController } from './avatar.controller';
import { Avatar, AvatarSchema } from './avatar.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Avatar.name, schema: AvatarSchema },
		]),
	],
	controllers: [AvatarController],
})
export class AvatarModule {}
