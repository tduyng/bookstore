import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvatarController } from './avatar.controller';
import { Avatar, AvatarSchema } from './avatar.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: Avatar.name, schema: AvatarSchema }])],
	controllers: [AvatarController],
})
export class AvatarModule {}
