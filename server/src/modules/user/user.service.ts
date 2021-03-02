import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery, FilterQuery } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel('user') private userModel: Model<User>) {}

	public async updateById({
		userId,
		input,
	}: {
		userId: User['_id'];
		input: UpdateQuery<User>;
	}): Promise<User> {
		return await this.userModel.findByIdAndUpdate(userId, input, { new: true }).exec();
	}

	public async findAll(): Promise<User[]> {
		return await this.userModel.find().lean();
	}

	public async findMany(query: FilterQuery<User>): Promise<User[]> {
		return await this.userModel.find(query).lean();
	}

	public async findOne(query: FilterQuery<User>): Promise<User | undefined> {
		return await this.userModel.findOne(query).lean();
	}

	// Only admin
	// public async deleteOne(query: FilterQuery<User>) {
	// 	return await this.userModel.deleteOne(query);
	// }

	// public async deleteMany(query: FilterQuery<User>) {
	// 	return await this.userModel.deleteMany(query);
	// }
}
