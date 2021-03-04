import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserWhereUniqueInput {
	@IsString()
	@IsOptional()
	_id?: string;

	@IsString()
	@IsOptional()
	googleId?: string;

	@IsString()
	@IsOptional()
	facebookId?: string;

	@IsEmail()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	username?: string;
}
