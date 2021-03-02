import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forFeature([])],
	controllers: [],
	providers: [UserService],
})
export class UserModule {}
