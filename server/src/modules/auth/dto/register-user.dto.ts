import { UserExitsValidator } from '@modules/user/decorators/';
import {
	IsEmail,
	IsOptional,
	IsString,
	Matches,
	MinLength,
	Validate,
} from 'class-validator';

export class RegisterUserDto {
	@Matches(/[a-zA-Z0-9_-]{2,20}/)
	username: string;

	@IsEmail()
	@Validate(UserExitsValidator)
	email: string;

	@IsString()
	@MinLength(3)
	@IsOptional()
	password?: string;

	@IsOptional()
	@IsString()
	facebookId?: string;

	@IsOptional()
	@IsString()
	googleId?: string;

	@IsOptional()
	@IsString()
	thumbnail?: string;
}
