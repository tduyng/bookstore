import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
	@IsString()
	@IsNotEmpty()
	token: string;

	@MinLength(3)
	@IsString()
	oldPassword: string;

	@MinLength(3)
	@IsString()
	newPassword: string;
}
