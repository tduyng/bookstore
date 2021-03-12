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
import cookieParser from 'cookie-parser';
import express from 'express';

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

		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(cookieParser());

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

	describe('With Auth', () => {
		beforeAll(async () => {
			agent = request.agent(app.getHttpServer());
			await agent.post('/auth/login').send(inputLogin);
		});

		it('(GET) /auth', async () => {
			const data = await agent.get('/auth').expect(200);
			expect(data.body).toMatchObject(authenticatedUser);
		});

		it('(POST) /users/purchase', async () => {
			const data = await agent
				.post(`/users/purchase`)
				.send({ _id: oneBook?._id })
				.expect(201);
			expect(data.body).toBeDefined();
			expect(Array.isArray(data.body)).toBe(true);
			const cart = JSON.parse(JSON.stringify(data.body));
			expect(cart.some((book) => book._id == oneBook?._id)).toBe(true);
		});

		it('(POST) /users/update-cart-item', async () => {
			// Add an item to cart first
			await agent.post(`/users/purchase`).send({ _id: oneBook?._id }).expect(201);

			// Update cart
			const data = await agent
				.post(`/users/update-cart-item`)
				.send({ _id: oneBook._id, total: 5 })
				.expect(201);
			expect(data.body).toBeDefined();
			expect(Array.isArray(data.body)).toBe(true);
			const cart = JSON.parse(JSON.stringify(data.body));
			const cartItem = cart.find((book) => book._id == oneBook?._id);
			expect(cartItem).toBeDefined();
			expect(cartItem.total).toBe(5);
		});

		it('(POST) /users/remove-cart-item', async () => {
			const data = await agent
				.post(`/users/update-cart-item`)
				.send({ _id: oneBook._id })
				.expect(201);
			expect(data.body).toBeDefined();
			expect(Array.isArray(data.body)).toBe(true);
		});
	});

	describe('Without Auth', () => {
		beforeAll(async () => {
			agent = request.agent(app.getHttpServer());
		});

		it('(GET) /books/book/:id', async () => {
			const data = await agent.get(`/books/book/${oneBook?._id}`).expect(200);
			expect(data.body.title).toEqual(oneBook.title);
		});

		it('(GET) /books/genre/:genre', async () => {
			const data = await agent.get(`/books/genre/${oneBook?.genre}`).expect(200);
			expect(data.body.count).toBeDefined();
			expect(data.body.books).toBeDefined();
		});

		it('(GET) /books/search/', async () => {
			const data = await agent.get(`/books/search?q=book`).expect(200);
			expect(data.body).toBeDefined();
			expect(Array.isArray(data.body)).toBe(true);
		});

		it('(GET) /books/query', async () => {
			const data = await agent.get(`/books/query?q=book?limit=10?page=1`).expect(200);
			expect(data.body.count).toBeDefined();
			expect(data.body.books).toBeDefined();
		});
	});
});
