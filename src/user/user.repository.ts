import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "src/common/repository.abstract";
import { User } from "./entities/user.entity";
import { EntityManager } from "typeorm";


@Injectable()
export class UserRepository extends AbstractRepository<User>{
  constructor (protected readonly entityManager: EntityManager){
    super(User, entityManager);
  }
}