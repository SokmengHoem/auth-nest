import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "src/common/repository.abstract";
import { Permission } from "./entities/permission.entity";
import { EntityManager } from "typeorm";


@Injectable()
export class PermissionRepository extends AbstractRepository<Permission>{
    constructor(protected readonly entityManger: EntityManager ){
        super(Permission, entityManger)
    }
}