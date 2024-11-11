import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) return true;

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      // Ensure user and user.roles are defined
      if(!user || !user.roles){
        throw new BadRequestException('User or user roles are undefined in RolesGuard');
      }
  
      // Check if user roles array has the expected structure
      return roles.some((role) => user.roles.includes(role));
    }
}
