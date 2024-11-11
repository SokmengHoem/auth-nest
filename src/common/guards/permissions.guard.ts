import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { PermissionName } from "../enums/permission-name.enum";
import { User } from "src/user/entities/user.entity";


@Injectable()
export class PermissionsGuard implements CanActivate {

    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredPermissions = this.reflector.getAllAndOverride<PermissionName[]>('permissions', [
            context.getHandler(),
            context.getClass(),
        ]);
        if(!requiredPermissions) return true;

        const { user } : { user: User} = context.switchToHttp().getRequest();

        const userPermissions = user.permissions.map((perm) => perm.name);
        const rolePermissions = user.roles.flatMap((role) => role.permissions.map((perm) => perm.name));

        return requiredPermissions.some((permission) => userPermissions.includes(permission) || rolePermissions.includes(permission));
    }
}