// src/Common/Guards/skip-roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
export const SKIP_ROLES_KEY = 'skipRoles';
export const SkipRoles = () => SetMetadata(SKIP_ROLES_KEY, true);
