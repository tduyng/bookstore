import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../user.schema';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
