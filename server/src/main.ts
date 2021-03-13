import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { envConfig } from './common/config/env.config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import RateLimit from 'express-rate-limit';
import { setupSwagger } from './common/config/swagger.config';
import { sessionConfig } from './common/config/session.config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import { useContainer } from 'class-validator';

async function bootstrap() {
	const env = envConfig();
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger:
			env.mode === 'development'
				? ['log', 'debug', 'error', 'verbose', 'warn']
				: ['error', 'warn'],
	});
	const port = env.port;

	// Handle errors
	app.useGlobalPipes(
		new ValidationPipe({
			skipMissingProperties: false,
			transform: true,
			validationError: {
				target: false,
			},
		}),
	);
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	// Allow inject dependency injection in  validator
	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	app.set('trust proxy', 1);
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(cookieParser(env.cookieSecret));
	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});

	if (env.mode === 'production') {
		app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
		app
			.use(compression())
			.use(helmet())
			.use(
				RateLimit({
					windowMs: 15 * 60 * 1000, // 15 minutes
					max: 100, // limit each IP to 100 requests per windowMs
				}),
			);

		// Enable cors middleware
		app.use(function (req, res, next) {
			res.header('Access-Control-Allow-Origin', env.clientUrl); // update to match the domain you will make the request from
			res.header(
				'Access-Control-Allow-Headers',
				'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
			);
			res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE, OPTIONS');
			res.header('Access-Control-Allow-Credentials', true);
			if (req.method === 'OPTIONS') {
				return res.sendStatus(204);
			}
			next();
		});

		// Disable console.log() in production
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		console.log = function () {};
	}

	// Session
	const sessionOptions = sessionConfig();
	app.use(session(sessionOptions));

	// Init passport
	app.use(passport.initialize());
	app.use(passport.session());

	app.setGlobalPrefix('api');
	if (env.mode !== 'production') {
		setupSwagger(app);
	}
	await app.listen(port, () => {
		console.log(`Server is running at http://localhost:${port}/api/docs/`);
	});
}
bootstrap();
