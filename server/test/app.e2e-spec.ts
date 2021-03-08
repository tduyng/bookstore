import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		app.close();
	});

	it('GET /', () => {
		return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
	});

	it('GET /health', () => {
		return request(app.getHttpServer()).get('/health').expect(200);
	});
});
