import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { sessionConfig } from 'src/common/config/session.config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import { useContainer } from 'class-validator';
import { Reflector } from '@nestjs/core';
import { createUserTest } from './utils/create-user-test';
import { LoginUserDto } from '@modules/auth/dto';
import { Book } from '@modules/book/book.schema';
import { User } from '@modules/user/user.schema';
import { createConnection } from 'src/providers/database/utils/create-connection';
import { Connection } from 'mongoose';

let oneBook: Book;
let agent: any;
let connection: Connection;
const inputLogin: LoginUserDto = {
	usernameOrEmail: 'user-test',
	password: '1234567',
};

const authenticatedUser = {
	email: 'user-test@email.com',
	username: 'user-test',
} as User;

describe('UserStory (User-Auth-Book) (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();

		// Session
		const sessionOptions = sessionConfig();
		app.use(session(sessionOptions));

		// Init passport
		app.use(passport.initialize());
		app.use(passport.session());

		// Handle errors
		app.useGlobalPipes(new ValidationPipe());
		app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

		// Allow inject dependency injection in  validator
		useContainer(app.select(AppModule), { fallbackOnErrors: true });

		// Drop exists database
		connection = await createConnection();
		oneBook = await createUserTest(connection);
		await app.init();
	});

	afterAll(async () => {
		connection.close();
		app.close();
	});

	describe('WithAuth', () => {
		beforeAll(async () => {
			agent = request.agent(app.getHttpServer());
			await agent.post('/auth/login').send(inputLogin);
		});

		it('(GET) /auth', async () => {
			const data = await agent.get('/auth').expect(200);
			expect(data.body).toMatchObject(authenticatedUser);
		});

		it('(GET) /books/book/:id', async () => {
			const data = await agent.get(`/books/book/${oneBook?.id}`).expect(200);
			expect(data.body.title).toEqual(oneBook.title);
		});
	});
});
