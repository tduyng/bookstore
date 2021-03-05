import { User } from '@modules/user/schemas/user.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy } from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { envConfig } from 'src/common/config/env.config';
import { PayloadUserForJwtToken } from 'src/common/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req?.session?.authToken.accessToken,
			]),
			ignoreExpiration: false,
			secretOrKey: envConfig().jwt.jwtSecret,
		});
	}

	async validate(payload: PayloadUserForJwtToken) {
		const user = await this.userModel.findOne({ email: payload.user.email });
		if (!user) throw new UnauthorizedException('User not found');
		return user;
	}
}
