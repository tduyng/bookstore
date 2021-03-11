import { BookService } from '@modules/book/book.service';
import { Body, Controller, HttpException, Logger, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserFromRequest } from 'src/common/types';
import { CartItemDto } from './dto/cart-item.dto';
import { CartItem } from './types/user.types';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
	constructor(private userService: UserService, private bookService: BookService) {}

	@Post('update-cart-item')
	public async updateAmountCartItem(@Body() cartItem: CartItemDto, @Req() req: Request) {
		const { _id } = cartItem;
		const user: UserFromRequest = req.user;
		try {
			const cartCookies = req.session?.cart;
			let cart: CartItem[] = [];
			if (cartCookies) cart = JSON.parse(cartCookies);

			cart = cart.map((item) =>
				item._id == _id ? { ...item, total: cartItem.total } : item,
			);

			req.session.cart = JSON.stringify(cart);
			// if logged in, update cart of user
			if (user) {
				await this.userService.updateCartItem(user._id, cartItem);
			}
			return cart;
		} catch (error) {
			throw new HttpException(error.message, 500);
		}
	}

	@Post('remove-cart-item')
	public async removeFromCart(@Body() cartItemDto: CartItemDto, @Req() req: Request) {
		const user: UserFromRequest = req.user;
		const { _id } = cartItemDto;
		const cartCookies = req.session?.cart;
		let cart: CartItem[] = [];
		if (cartCookies) cart = JSON.parse(cartCookies);

		const updatedCart = cart.filter((item) => item._id != _id);
		req.session.cart = JSON.stringify(updatedCart);
		if (user) {
			await this.userService.removeCartItem(user._id, _id);
		}
		return updatedCart;
	}

	@Post('remove-carts')
	public async removeAllFromCart(@Req() req: Request) {
		const user: UserFromRequest = req.user;
		req.session.cart = JSON.stringify([]);
		if (user) {
			await this.userService.removeAllFromCart(user._id);
		}
		return [];
	}

	@Post('purchase')
	public async addToCart(@Body() cartItemDto: CartItemDto, @Req() req: Request) {
		const cartCookies = req.session?.cart;
		let cart: CartItem[] = [];
		if (cartCookies) cart = JSON.parse(cartCookies);

		// If cart not empty, check if item is belongs to cart or not
		const indexItem = cart.findIndex((item) => item._id == cartItemDto._id);
		const user: UserFromRequest = req.user;
		try {
			// If belongs to cart, we will update amount of item + 1 in cart
			if (indexItem >= 0) {
				cart = cart.map((item) =>
					item._id == cartItemDto._id ? { ...item, total: item.total + 1 } : item,
				);
				if (user) {
					await this.userService.addItemToCart(
						user.id,
						{ _id: cartItemDto._id, total: 1 },
						true,
					);
				}

				// if not exists, add new one
			} else {
				const book = await this.bookService.findById(cartItemDto._id);
				if (book) {
					const { _id, title, price, old_price } = book;
					cart.push({ total: 1, _id, title, price, old_price });
					if (user) {
						await this.userService.addItemToCart(
							user.id,
							{ _id, total: 1, title, price, old_price },
							false,
						);
					}
				}
			}
		} catch (error) {
			Logger.error(error.message);
		}

		req.session.cart = JSON.stringify(cart);
		return cart;
	}
}
