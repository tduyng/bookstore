import { AuthModule } from '@modules/auth/auth.module';
import { BookModule } from '@modules/book/book.module';
import { EmailModule } from 'src/providers/email/email.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'src/app/app.controller';
import { AppService } from 'src/app/app.service';
import { envConfig } from './common/config/env.config';
import { AvatarModule } from '@modules/avatar/avartar.module';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			useFactory: () => ({
				uri: envConfig().mongodbUri,
				useNewUrlParser: true,
				useFindAndModify: false,
				useCreateIndex: true,
			}),
		}),
		EmailModule,
		UserModule,
		AuthModule,
		BookModule,
		AvatarModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
