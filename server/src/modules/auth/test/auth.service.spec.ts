import { User } from '@modules/user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { EmailService } from 'src/providers/email/email.service';
import { LoginUserDto } from '../dto';
import { AuthService } from '../services/auth.service';
import { PasswordService } from '../services/password.service';

describe('AuthService', () => {
	let authService: AuthService;
	let passwordService: PasswordService;

	let userModel: any;

	const mockUserModel = () => ({
		findOne: jest.fn(),
		findByIdAndUpdate: jest.fn(),
	});

	const mockEmailService = () => ({
		sendWelcome: jest.fn(),
		sendEmailConfirmation: jest.fn(),
		sendResetPassword: jest.fn(),
	});

	const mockJwtService = () => ({
		sign: jest.fn(),
		signAsync: jest.fn(),
		verify: jest.fn(),
		verifyAsync: jest.fn(),
	});

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				JwtService,
				PasswordService,
				{ provide: getModelToken(User.name), useFactory: mockUserModel },
				{ provide: EmailService, useFactory: mockEmailService },
				{ provide: JwtService, useFactory: mockJwtService },
			],
		}).compile();

		authService = module.get<AuthService>(AuthService);
		passwordService = module.get<PasswordService>(PasswordService);
		userModel = module.get<Model<User>>(getModelToken(User.name));
	});

	it('Should be defined', () => {
		expect(authService).toBeDefined();
	});

	describe('validateUser', () => {
		let loginInput: LoginUserDto;
		let hash: string;
		let mockUser: User;
		beforeAll(async () => {
			loginInput = {
				usernameOrEmail: 'some-email@email.com',
				password: '123456',
			};
			hash = await passwordService.hash(loginInput.password);
			mockUser = {
				username: 'some-username',
				email: 'some-email@email.com',
				password: hash,
			} as User;
		});
		it('Should return an user when login by email', async () => {
			userModel.findOne.mockImplementationOnce(() => ({
				select: jest
					.fn()
					.mockImplementationOnce(() => ({ lean: jest.fn().mockReturnValue(mockUser) })),
			}));
			const user = await authService.validateUser(loginInput);
			expect(user).toEqual(mockUser);
		});
	});
});
