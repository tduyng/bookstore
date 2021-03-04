import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserWhereUniqueInput } from './dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel('user') private userModel: Model<User>) {}

	public async findOne(where: UserWhereUniqueInput): Promise<User> {
		return this.userModel.findOne(where);
	}

	public async findById(_id: string): Promise<User> {
		return this.userModel.findById(_id);
	}

	// post upload
	// get avatar/:name
	// post purchase
	// post updateCart
	// deleteCart

	// sub: avatar: --> findOneAndUpdate, findOne
}
