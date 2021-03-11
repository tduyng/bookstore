import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CartItemDto {
	@IsString()
	@IsNotEmpty()
	_id: string;

	@IsNumber()
	@IsOptional()
	total?: number;
}
