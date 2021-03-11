import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CartItemDto } from '../dto/cart-item.dto';
import { CartItem } from '../types/user.types';
import { User } from '../user.schema';
import { UserService } from '../user.service';

const oneUser = {
	_id: 'some-id',
	email: 'some-email@email.com',
	cart: [
		{
			_id: 'some-book-id-1',
			total: 2,
		},
		{
			_id: 'some-book-id-2',
			total: 3,
		},
	],
} as User;

const cartItemDto = { bookId: 'some-book-id', total: 1 } as CartItemDto;

describe('UserService', () => {
	let userService: UserService;
	let userModel: any;

	const mockUserModel = () => ({
		findOne: jest.fn(),
		findById: jest.fn(),
		findOneAndUpdate: jest.fn(),
		findByIdAndUpdate: jest.fn(),
	});

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{ provide: getModelToken(User.name), useFactory: mockUserModel },
			],
		}).compile();
		userService = module.get<UserService>(UserService);
		userModel = module.get<Model<User>>(getModelToken(User.name));
	});

	it('Should be defined', () => {
		expect(userService).toBeDefined();
	});

	describe('findOne', () => {
		it('Should return an user', async () => {
			userModel.findOne.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(oneUser),
			}));
			const result = await userService.findOne({ email: 'some-email@email.com' });
			expect(result).toEqual(oneUser);
		});
	});
	describe('findById', () => {
		it('Should return an user', async () => {
			userModel.findById.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(oneUser),
			}));
			const result = await userService.findById('some-id');
			expect(result).toEqual(oneUser);
		});
	});

	describe('updateCartItem', () => {
		it('Should return an user', async () => {
			userModel.findOneAndUpdate.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(oneUser),
			}));
			const result = await userService.updateCartItem('some-id', cartItemDto);
			expect(result).toEqual(oneUser);
		});
	});

	describe('addItemToCart', () => {
		it('Should add new item to cart successfully', async () => {
			userModel.findOneAndUpdate.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(oneUser),
			}));
			const cartItem: CartItem = {
				_id: cartItemDto.bookId,
				total: 1,
			};
			const result = await userService.addItemToCart('some-id', cartItem);
			expect(result).toEqual(oneUser);
		});
		it('Should update total of cart item successfully when item already exists', async () => {
			userModel.findOneAndUpdate.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(oneUser),
			}));
			const cartItem: CartItem = {
				_id: cartItemDto.bookId,
				total: 1,
			};
			const result = await userService.addItemToCart('some-id', cartItem, true);
			expect(result).toEqual(oneUser);
		});
	});

	describe('removeCartItem', () => {
		it('Should remove item successfully', async () => {
			userModel.findByIdAndUpdate.mockImplementationOnce(() => ({
				lean: jest.fn().mockReturnValue(oneUser),
			}));
			const result = await userService.removeCartItem('some-id', 'book-id');
			expect(result).toEqual(oneUser);
		});
	});
});
