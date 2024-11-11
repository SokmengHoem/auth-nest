import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { RoleModule } from 'src/role/role.module';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  imports: [RoleModule, PermissionModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
