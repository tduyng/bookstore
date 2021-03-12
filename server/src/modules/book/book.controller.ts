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
		const safeLimit = parseInt(limit.toString()) || 25;
		const safePage = parseInt(p.toString()) || 1;
		const pagination: PaginationDto = {
			limit: safeLimit,
			page: safePage,
		};
		return await this.bookService.findManyByGenre(genre, pagination);
	}

	@Get('search')
	public async searchBooks(@Query('q') q: string) {
		return await this.bookService.searchBooks(q);
	}

	@Get('query')
	public async queryBooks(
		@Query('q') q: string,
		@Query('limit') limit?: number,
		@Query('p') p?: number,
	) {
		if (!limit) {
			return await this.bookService.queryBooks(q);
		}
		const safeLimit = parseInt(limit.toString()) || 25;
		const safePage = parseInt(p.toString()) || 1;
		const pagination: PaginationDto = {
			limit: safeLimit,
			page: safePage,
		};
		return await this.bookService.queryBooks(q, pagination);
	}
}
