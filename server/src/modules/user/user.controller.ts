import { BookService } from '@modules/book/book.service';
import { Body, Controller, HttpException, Post, Req } from '@nestjs/common';
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
		const { bookId } = cartItem;
		const user: UserFromRequest = req.user;
		try {
			const cartCookies = req.session?.cart;
			let cart: CartItem[] = [];
			if (cartCookies) cart = JSON.parse(cartCookies);

			cart = cart.map((item) =>
				item._id == bookId ? { ...item, total: cartItem.total } : item,
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
		const { bookId } = cartItemDto;
		const cartCookies = req.session?.cart;
		let cart: CartItem[] = [];
		if (cartCookies) cart = JSON.parse(cartCookies);

		const updatedCart = cart.filter((item) => item._id != bookId);
		req.session.cart = JSON.stringify(updatedCart);
		if (user) {
			await this.userService.removeCartItem(user._id, bookId);
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
		const { bookId } = cartItemDto;
		let cart: CartItem[] = [];
		if (cartCookies) cart = JSON.parse(cartCookies);

		const indexItem = cart.findIndex((item) => item._id == bookId);
		const user: UserFromRequest = req.user;
		if (indexItem >= 0) {
			cart = cart.map((item) =>
				item._id == bookId ? { ...item, total: item.total + 1 } : item,
			);
			if (user) {
				await this.userService.addItemToCart(user.id, { _id: bookId, total: 1 }, true);
			}
		} else {
			const { _id, title, price, old_price } = await this.bookService.findById(bookId);
			cart.push({ total: 1, _id, title, price, old_price });
			if (user) {
				await this.userService.addItemToCart(
					user.id,
					{ _id, total: 1, title, price, old_price },
					false,
				);
			}
		}
		req.session.cart = JSON.stringify(cart);
		return cart;
	}
}
