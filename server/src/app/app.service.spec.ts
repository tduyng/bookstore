import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
	let appService: AppService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [AppService],
			providers: [AppService],
		}).compile();

		appService = app.get<AppService>(AppService);
	});

	it('Should be defined', () => {
		expect(appService).toBeDefined();
	});
});
