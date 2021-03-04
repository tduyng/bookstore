import { Injectable } from '@nestjs/common';
import {
	ValidatorConstraint,
	ValidationArguments,
	ValidatorConstraintInterface,
} from 'class-validator';
import { emailRegex, User } from '../user.schema';
import { UserService } from '../user.service';

@ValidatorConstraint({ name: 'user', async: true })
@Injectable()
export class UserExitsValidator implements ValidatorConstraintInterface {
	constructor(private readonly userService: UserService) {}

	/**
	 * Method should return true, if name is not taken
	 */
	public async validate(usernameOrEmail: string, _args: ValidationArguments) {
		const isEmail = emailRegex.test(usernameOrEmail);

		let check: User;
		if (isEmail) {
			check = await this.userService.findOne({
				email: usernameOrEmail,
			});
		} else {
			check = await this.userService.findOne({
				username: usernameOrEmail,
			});
		}
		// if user exist --> return false: can not validate
		if (check) return false;

		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	defaultMessage(_args: ValidationArguments) {
		return 'User with $property $value already exists';
	}
}
