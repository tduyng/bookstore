import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserWhereUniqueInput } from './dto';
import { CartItemDto } from './dto/cart-item.dto';
import { CartItem } from './types/user.types';
import { User } from './user.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	public async findOne(where: UserWhereUniqueInput): Promise<User> {
		const user: User = await this.userModel.findOne(where).lean();
		return user;
	}

	public async findById(_id: string): Promise<User> {
		const user: User = await this.userModel.findById(_id).lean();
		return user;
	}

	public async updateCartItem(userId: string, cartItemDto: CartItemDto) {
		const user: User = await this.userModel
			.findOneAndUpdate(
				{
					_id: userId,
					'cart._id': cartItemDto._id,
				},
				{
					$set: { 'cart.$.total': cartItemDto.total },
				},
				{ new: true },
			)
			.lean();
		return user;
	}

	public async addItemToCart(userId: string, cartItem: CartItem, isExists = false) {
		let user: User;
		if (isExists) {
			user = await this.userModel
				.findOneAndUpdate(
					{
						_id: userId,
						'cart._id': cartItem._id,
					},
					{
						$inc: { 'cart.$.total': cartItem.total },
					},
					{ new: true },
				)
				.lean();
		} else {
			user = await this.userModel
				.findOneAndUpdate(
					{
						_id: userId,
					},
					{ $push: { cart: cartItem } },
					{ new: true },
				)
				.lean();
		}
		return user;
	}

	public async removeCartItem(userId: string, _id: string) {
		const user = await this.userModel
			.findByIdAndUpdate(userId, { $pull: { cart: { _id } } }, { new: true })
			.lean();
		return user;
	}
	public async removeAllFromCart(userId: string) {
		const user: User = await this.userModel
			.findByIdAndUpdate(
				userId,
				{
					$set: { cart: [] },
				},
				{ new: true },
			)
			.lean();
		return user;
	}

	public async updateThumbnail(userId: string, thumbnail: string) {
		const user: User = await this.userModel
			.findByIdAndUpdate(userId, { thumbnail: thumbnail }, { new: true })
			.select('+thumbnail')
			.lean();
		return user;
	}
}
