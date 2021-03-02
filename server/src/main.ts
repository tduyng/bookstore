import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { envConfig } from './common/config/env.config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import RateLimit from 'express-rate-limit';
import cors from 'cors';
import csurf from 'csurf';
import { setupSwagger } from './common/config/swagger.config';
import session from 'express-session';
import { sessionConfig } from './common/config/session.config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const env = envConfig();
	const port = env.port;

	app.set('trust proxy', 1);
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(
		cors({
			origin: '*',
			credentials: true,
		}),
	);

	app.use(cookieParser());

	if (env.mode === 'production') {
		app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
		app
			.use(compression())
			.use(helmet())
			.use(csurf())
			.use(
				RateLimit({
					windowMs: 15 * 60 * 1000, // 15 minutes
					max: 100, // limit each IP to 100 requests per windowMs
				}),
			);
	}

	// Session
	app.use(session(sessionConfig()));

	// Handle errors
	app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	app.setGlobalPrefix('api');
	setupSwagger(app);
	await app.listen(3000, () => {
		console.log(`Server is running at http://localhost:${port}/api/docs/`);
	});
}
bootstrap();
