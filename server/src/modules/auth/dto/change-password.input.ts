import { IsOptional, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
	@IsString()
	@IsOptional()
	token?: string;

	@MinLength(3)
	@IsString()
	oldPassword: string;

	@MinLength(3)
	@IsString()
	newPassword: string;
}
