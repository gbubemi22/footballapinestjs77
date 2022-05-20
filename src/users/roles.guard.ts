/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
//import { User } from './schema/user.schema';
import { Role } from './user.enum';
//import { UsersService } from './users.service';



@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('--->', requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }

 
// @Injectable()
// export class RolesGuard implements CanActivate {
//     constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.getRoles(context);
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     return this.matchRoles(roles, user);
//   }

//   private getRoles(context: ExecutionContext): UserRole[] {
//     const request = context.switchToHttp().getRequest();
//     return request.user.roles;
//   }

//   private matchRoles(roles: UserRole[], user: User): boolean {
//     return roles.some((role) => user.roles.includes(role));
//   }
// }
}