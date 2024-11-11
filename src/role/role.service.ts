import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { UserRole } from './entities/role.entity';
import { RoleRepository } from './role.repository';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class RoleService extends BaseService<UserRole> {
    constructor(private readonly roleRepository: RoleRepository){
        super(roleRepository);
    }

    async findByName(roleName: Role): Promise<UserRole | undefined> {
        return this.roleRepository.findOne({where: {name: roleName}});
    }
}
