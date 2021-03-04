import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { UserFromRequest } from 'src/common/types';

export const CurrentUser = createParamDecorator((data, context: ExecutionContext) => {
	const req = context.switchToHttp().getRequest();
	if (!req.user) {
		throw new UnauthorizedException('No user found for request');
	}
	return req.user as UserFromRequest;
});
