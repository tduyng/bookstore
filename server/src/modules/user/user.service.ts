import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel('user') private userModel: Model<User>) {}

	// post upload
	// get avatar/:name
	// post purchase
	// post updateCart
	// deleteCart

	// sub: avatar: --> findOneAndUpdate, findOne
}
