import { emailRegex, User } from '@modules/user/schemas/user.schema';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
	DataStoredFromToken,
	PayloadUserForJwtToken,
	SessionAuthToken,
} from 'src/common/types';
import { ChangePasswordDto, LoginUserDto, RegisterUserDto } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { EmailService } from 'src/providers/email/email.service';
import { envConfig } from 'src/common/config/env.config';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private jwtService: JwtService,
		private emailService: EmailService,
		private passwordService: PasswordService,
	) {}

	public async validateUser(input: LoginUserDto): Promise<User> {
		const { usernameOrEmail, password } = input;
		const isEmail = emailRegex.test(usernameOrEmail);
		let user: User;
		if (isEmail) {
			user = await this.userModel
				.findOne({ email: usernameOrEmail })
				.select('+password')
				.lean();
		} else {
			user = await this.userModel
				.findOne({ username: usernameOrEmail })
				.select('+password')
				.lean();
		}

		if (!user) return null;
		const isMatch = await this.passwordService.verify(user.password, password);
		if (!isMatch) return null;
		return user;
	}

	public async register(input: RegisterUserDto): Promise<{ token: string }> {
		// just send token to email
		const payload: PayloadUserForJwtToken = {
			user: { ...input },
		};
		const emailToken = this.jwtService.sign(payload);
		await this.emailService.sendEmailConfirmation(input.email, emailToken);

		return {
			token: emailToken,
		};
	}

	public async activateAccount(token: string): Promise<User> {
		const decoded: DataStoredFromToken = await this.jwtService.verifyAsync(token);
		if (!decoded || !decoded.user) return null;
		const { user } = decoded;
		const newUser = await this.userModel.create(user);
		await this.emailService.sendWelcome(newUser.email);
		return newUser;
	}

	public async forgotPassword(email: string) {
		const user = await this.userModel.findOne({ email });
		if (!user) {
			throw new BadRequestException(`Not user found with email: ${email}`);
		}
		const payload: PayloadUserForJwtToken = {
			user: {
				email,
			},
		};
		const token = await this.jwtService.signAsync(payload);
		await this.emailService.sendResetPassword(email, token);
		return {
			token,
		};
	}

	public async resetPassword(input: ChangePasswordDto) {
		const { token, oldPassword, newPassword } = input;
		const decoded: DataStoredFromToken = await this.jwtService.verifyAsync(token);
		if (!decoded) {
			throw new UnauthorizedException('Token invalid or missing');
		}
		const { user } = decoded;
		const realUser: User = await this.userModel
			.findOne({ email: user.email })
			.select('+password')
			.lean();
		if (!realUser) {
			throw new UnauthorizedException(`Can not find user with token given`);
		}
		const isMatch = await this.passwordService.verify(realUser.password, oldPassword);
		if (!isMatch) {
			throw new BadRequestException('Old password not match current password');
		}
		if (oldPassword !== newPassword) {
			throw new BadRequestException('Old password and newPassword must be match');
		}
		user.password = newPassword;
		await user.save();
		return user;
	}

	public async generateAuthToken(
		payload: PayloadUserForJwtToken,
	): Promise<SessionAuthToken> {
		const envJwt = envConfig().jwt;
		const expiredTime = envJwt.jwtExpiredTime;
		const refreshExpiredTime = envJwt.jwtRefreshExpiredTime;

		const sessionAuthToken: SessionAuthToken = {
			authToken: {
				accessToken: await this.jwtService.signAsync(payload, { expiresIn: expiredTime }),
				refreshToken: await this.jwtService.signAsync(payload, {
					expiresIn: refreshExpiredTime,
				}),
			},
		};
		return sessionAuthToken;
	}

	public async resetCurrentHashedRefreshToken(id: string, refreshToken: string) {
		const currentHashedRefreshToken = await this.passwordService.hash(refreshToken);
		const user: User = await this.userModel
			.findByIdAndUpdate(id, {
				currentHashedRefreshToken,
			})
			.lean();
		return user;
	}

	public async resetAccessToken(payload: PayloadUserForJwtToken): Promise<string> {
		const expiredTime = envConfig().jwt.jwtExpiredTime;
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: expiredTime,
		});
		return accessToken;
	}
}
