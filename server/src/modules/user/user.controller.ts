import { BookService } from '@modules/book/book.service';
import {
	BadRequestException,
	Body,
	Controller,
	HttpException,
	Logger,
	Post,
	Req,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserFromRequest } from 'src/common/types';
import { CartItemDto } from './dto/cart-item.dto';
import { CartItem } from './types/user.types';
import { UserService } from './user.service';
import { diskStorage } from 'multer';
import cloudinaryRaw from 'cloudinary';
const cloudinary = cloudinaryRaw.v2;
import fs from 'fs';
import { JwtAuth } from '@modules/auth/guards';
import { envConfig } from 'src/common/config/env.config';

// import { promisify } from 'util';
// const unlink = promisify(fs.unlink);

const env = envConfig();
cloudinary.config({
	cloud_name: env.cloudinary.cloudName,
	api_key: env.cloudinary.apiKey,
	api_secret: env.cloudinary.secret,
});
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
					item._id == cartItemDto._id
						? { ...item, total: item.total + cartItemDto.total }
						: item,
				);
				if (user) {
					await this.userService.addItemToCart(
						user.id,
						{ _id: cartItemDto._id, total: cartItemDto.total },
						true,
					);
				}

				// if not exists, add new one
			} else {
				const book = await this.bookService.findById(cartItemDto._id);
				if (book) {
					const { _id, title, price, old_price, imgURL } = book;
					cart.push({ total: cartItemDto.total, _id, title, price, old_price, imgURL });
					if (user) {
						await this.userService.addItemToCart(
							user.id,
							{ _id, total: cartItemDto.total, title, price, old_price, imgURL },
							false,
						);
					}
				} else {
					throw new BadRequestException(
						`AddItemToCart error: book not found with id: ${cartItemDto._id}`,
					);
				}
			}
		} catch (error) {
			Logger.error(error.message);
			throw error;
		}

		req.session.cart = JSON.stringify(cart);
		return cart;
	}

	//Upload cloudinary
	@JwtAuth()
	@Post('/upload')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: 'src/upload',
			}),
		}),
	)
	public async uploadImage(@Req() req: Request, @UploadedFile() file: any) {
		try {
			const user = req.user as UserFromRequest;
			if (!file) {
				throw new BadRequestException('Please choose a file');
			}
			// Transaction avatar & user thumbnail
			const path = process.cwd() + `/src/upload/${file.filename}`;
			const uniqueFileName = Date.now() + '-' + file.originalname;
			const imagePublicId = `avatars/${uniqueFileName}`;

			const image = await cloudinary.uploader.upload(path, {
				public_id: imagePublicId,
				tags: `avatars`,
				quality: 60,
			});

			const updated = await this.userService.updateThumbnail(user._id, image.url);

			fs.unlinkSync(path);
			return updated;
		} catch (error) {
			throw new HttpException(error.message, 500);
		}
	}
}
