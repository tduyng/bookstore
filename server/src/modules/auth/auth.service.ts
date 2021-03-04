import { User } from '@modules/user/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PayloadUserForJwtToken } from 'src/common/types';
import { RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	public async register(input: RegisterUserDto): Promise<{ token: string }> {
		// just send token to email
		const payload: PayloadUserForJwtToken = {
			user: { ...input },
		};

		return {
			token: 'some',
		};
	}

	// forgot password
	// reset password
	// logout
}
