import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { BaseService } from 'src/common/base.service';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService extends BaseService<Permission>{
    constructor(private readonly permissionRepository: PermissionRepository){
        super(permissionRepository);
    }
}
