import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { SKIP_ROLES_KEY } from './skip-roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1️⃣ Check if route is marked as @SkipRoles()
    const isSkipRoles = this.reflector.getAllAndOverride<boolean>(
      SKIP_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isSkipRoles) return true;

    // 2️⃣ Get required roles from @Roles() metadata
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) return true;

    // 3️⃣ Get the user from request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 4️⃣ Check if user has any of the required roles
    return user && requiredRoles.includes(user.role);
  }
}
