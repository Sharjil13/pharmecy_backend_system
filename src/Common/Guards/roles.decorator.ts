import { SetMetadata } from '@nestjs/common';

export enum Role {
  OWNER = 'owner',
  PHARMACIST = 'pharmacist',
  CASHIER = 'cashier',
}

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
