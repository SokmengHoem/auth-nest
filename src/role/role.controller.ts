import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role';
import { UserRole } from './entities/role.entity';

@Controller('role')
export class RoleController {

    constructor(private readonly roleService: RoleService){}

    @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<UserRole> {
        return await this.roleService.create(createRoleDto);
    }
}
