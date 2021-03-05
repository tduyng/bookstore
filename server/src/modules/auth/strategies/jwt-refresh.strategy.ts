import { User } from '@modules/user/schemas/user.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Strategy } from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { envConfig } from 'src/common/config/env.config';
import { PayloadUserForJwtToken } from 'src/common/types';
import { PasswordService } from '../services/password.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh-token',
) {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private passwordService: PasswordService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req?.session?.authToken?.refreshToken,
			]),
			ignoreExpiration: false,
			secretOrKey: envConfig().jwt.jwtRefreshSecret,
			passReqToCallback: true,
		});
	}
	async validate(req: Request, payload: PayloadUserForJwtToken) {
		const user = await this.userModel
			.findOne({ email: payload.user.email })
			.select('+currentHashedRefreshToken');
		if (!user) throw new UnauthorizedException('User not found');
		const refreshToken = req?.session?.authToken.refreshToken;
		const isRefreshTokenMatching = await this.passwordService.verify(
			user.currentHashedRefreshToken,
			refreshToken,
		);

		if (!isRefreshTokenMatching)
			throw new UnauthorizedException('Refresh token not match!');
		return user;
	}
}
