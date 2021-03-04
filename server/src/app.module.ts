import { AuthModule } from '@modules/auth/services/auth.module';
import { EmailModule } from '@modules/email/email.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'src/app/app.controller';
import { AppService } from 'src/app/app.service';
import { envConfig } from './common/config/env.config';

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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
