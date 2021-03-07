import { BookService } from '@modules/book/book.service';
import { Controller, HttpException, Post, Req } from '@nestjs/common';
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
	public async updateAmountCartItem(cartItem: CartItemDto, @Req() req: Request) {
		const { _id } = cartItem;
		const user: UserFromRequest = req.user;
		try {
			const cartCookie = req.session?.cart;
			const cart: CartItem[] = JSON.parse(cartCookie) || [];
			cart.map((item) => (item._id == _id ? { ...item, total: cartItem.total } : item));
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
	public async removeFromCart(_id: string, @Req() req: Request) {
		const user: UserFromRequest = req.user;

		const cartCookie = req.session?.cart;
		const cart: CartItem[] = JSON.parse(cartCookie) || [];
		const updatedCart = cart.filter((item) => item._id != _id);
		req.session.cart = JSON.stringify(updatedCart);
		if (user) {
			await this.userService.removeCartItem(user._id, _id);
		}
		return updatedCart;
	}

	@Post('purchase')
	public async addToCart(bookId: string, @Req() req: Request) {
		const cartCookies = req.session?.cart;
		const cart: CartItem[] = JSON.parse(cartCookies) || [];
		const indexItem = cart.findIndex((item) => item._id == bookId);
		const user: UserFromRequest = req.user;
		if (indexItem >= 0) {
			cart.map((item) =>
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
