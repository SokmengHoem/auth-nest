import { SetMetadata } from "@nestjs/common";
import { PermissionName } from "../enums/permission-name.enum";

export const Permissions = (...permissions: PermissionName[]) => SetMetadata('permissions', permissions);