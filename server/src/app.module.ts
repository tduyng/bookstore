import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
