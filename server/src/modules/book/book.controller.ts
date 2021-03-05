import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('books')
@ApiTags('Books')
export class BookController {
	@Get()
	public hello() {
		return 'books';
	}
}
