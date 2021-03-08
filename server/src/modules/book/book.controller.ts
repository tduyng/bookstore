import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { PaginationDto } from './dto';

@Controller('books')
@ApiTags('Books')
export class BookController {
	constructor(private bookService: BookService) {}

	@Get('book/:id')
	public async bookById(@Param('id') id: string) {
		return await this.bookService.findById(id);
	}

	@Get('genre/:genre')
	public async booksByGenre(
		@Param('genre') genre: string,
		@Query('limit') limit?: number,
		@Query('p') p?: number,
	) {
		if (!limit) {
			return await this.bookService.findManyByGenre(genre);
		}
		const pagination: PaginationDto = {
			limit,
			page: p || 1,
		};
		return await this.bookService.findManyByGenre(genre, pagination);
	}

	@Get('search')
	public async searchBooks(@Query('text') text: string) {
		return await this.bookService.searchBooks(text);
	}

	@Get('query')
	public async queryBooks(
		@Query('text') text: string,
		@Query('limit') limit?: number,
		@Query('p') p?: number,
	) {
		if (!limit) {
			return await this.bookService.queryBooks(text);
		}
		const pagination: PaginationDto = {
			limit,
			page: p || 1,
		};
		return await this.bookService.queryBooks(text, pagination);
	}
}
