import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Avatar, AvatarSchema } from './avatar.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Avatar.name, schema: AvatarSchema }])],
	controllers: [],
	providers: [],
})
export class UserModule {}
