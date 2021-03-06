import { User } from '@modules/user/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Profile, Strategy } from 'passport-facebook';
import { RegisterUserDto } from '../dto';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {
		super({
			clientId: process.env.FB_APP_ID,
			clientSecret: process.env.FB_APP_SECRET,
			callbackURL: '/auth/facebook/callback',
			scope: 'email',
			profileFields: ['emails', 'displayName', 'photos'],
		});
	}

	public async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: (err: any, user?: any, info?: any) => void,
	): Promise<any> {
		const { email } = profile._json;
		let existingUser = null;
		if (email) {
			existingUser = await this.userModel.findOne({ email }).lean();
		} else {
			existingUser = await this.userModel.findOne({ facebookId: profile.id }).lean();
		}
		if (existingUser) {
			return done(null, existingUser);
		}
		try {
			const input: RegisterUserDto = {
				username: profile.displayName,
				facebookId: profile.id,
				email: profile._json.email || '',
				thumbnail: profile.photos[0].value || '',
			};
			const newUser: User = await this.userModel.create(input);

			done(null, newUser);
		} catch (err) {
			return done(err);
		}
	}
}
