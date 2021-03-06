import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserWhereUniqueInput } from './dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	public async findOne(where: UserWhereUniqueInput): Promise<User> {
		const user: User = await this.userModel.findOne(where);
		return user;
	}

	public async findById(_id: string): Promise<User> {
		const user: User = await this.userModel.findById(_id);
		return user;
	}

	// post upload
	// get avatar/:name
	// post purchase
	// post updateCart
	// deleteCart

	// sub: avatar: --> findOneAndUpdate, findOne
}
