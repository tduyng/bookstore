import { IsNumber } from 'class-validator';

export class PaginationDto {
	@IsNumber()
	limit: number;

	@IsNumber()
	page: number;
}
