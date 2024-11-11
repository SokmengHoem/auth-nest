import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "src/common/repository.abstract";
import { UserRole } from "./entities/role.entity";
import { EntityManager } from "typeorm";

@Injectable()
export class RoleRepository extends AbstractRepository<UserRole>{
    constructor(protected readonly entityManager: EntityManager){
        super(UserRole, entityManager);
    }
}