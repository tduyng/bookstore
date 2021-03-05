import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../schemas/user.schema';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
