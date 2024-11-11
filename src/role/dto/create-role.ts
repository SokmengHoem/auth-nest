
import { IsArray, IsEnum } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class CreateRoleDto{
 
    @IsEnum(Role)
    readonly  name: Role;
}