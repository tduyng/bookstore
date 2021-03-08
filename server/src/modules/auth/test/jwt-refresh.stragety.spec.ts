import { User } from '@modules/user/user.schema';
import { UnauthorizedException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { PayloadUserForJwtToken } from 'src/common/types';
import { JwtRefreshTokenStrategy } from '../strategies/jwt-refresh.strategy';
import { Request } from 'express';
import { PasswordService } from '../services/password.service';

const oneUser = { _id: 'some_id', email: 'some_email' } as User;

describe('JwtRefreshTokenStrategy', () => {
	let jwtRefreshTokenStrategy: JwtRefreshTokenStrategy;
	let userModel: any;
	let passwordService: any;

	const mockUserModel = () => ({
		findOne: jest.fn(() => ({ lean: jest.fn() })),
	});

	const mockRequest = {
		session: {
			authToken: {
				refreshToken: 'some-token',
			},
		},
	} as Request;

	const mockPasswordService = () => ({
		verify: jest.fn(),
	});

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				JwtRefreshTokenStrategy,
				{ provide: getModelToken(User.name), useFactory: mockUserModel },
				{
					provide: PasswordService,
					useFactory: mockPasswordService,
				},
			],
		}).compile();

		jwtRefreshTokenStrategy = module.get<JwtRefreshTokenStrategy>(
			JwtRefreshTokenStrategy,
		);
		userModel = module.get<Model<User>>(getModelToken(User.name));
		passwordService = module.get<PasswordService>(PasswordService);
	});

	it('Should be defined', () => {
		expect(jwtRefreshTokenStrategy).toBeDefined();
	});

	describe('activate', () => {
		it('Should be throw an error when user not found', async () => {
			const payload = {
				user: { _id: 'some_id', email: 'some-email@email.com' },
			} as PayloadUserForJwtToken;
			userModel.findOne.mockImplementationOnce(() => ({
				select: jest.fn(() => ({ lean: jest.fn().mockReturnValue(null) })),
			}));
			try {
				await jwtRefreshTokenStrategy.validate(mockRequest, payload);
			} catch (error) {
				expect(error).toBeInstanceOf(UnauthorizedException);
			}
		});
		it('Should return an user', async () => {
			const payload = {
				user: { email: 'some-email@email.com' },
			} as PayloadUserForJwtToken;
			userModel.findOne.mockImplementationOnce(() => ({
				select: jest.fn(() => ({ lean: jest.fn().mockReturnValue(oneUser) })),
			}));
			passwordService.verify.mockReturnValue(true);

			const user = await jwtRefreshTokenStrategy.validate(mockRequest, payload);
			expect(user).toEqual(user);
		});
	});
});
