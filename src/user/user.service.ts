import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseService } from 'src/common/base.service';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { paginate } from 'src/common/utils/pagination.util';
import {
  PaginatedResponse,
  PaginationParams,
} from 'src/common/interfaces/paginated.interface';
import { RoleRepository } from 'src/role/role.repository';
import { PermissionRepository } from 'src/permission/permission.repository';
import { Role } from 'src/common/enums/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {
    super(userRepository);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findAllPaginated(
    paginationParams: PaginationParams,
    message: string,
  ): Promise<PaginatedResponse<User>> {
    return paginate(this.userRepository, paginationParams, message);
  }

  async createSuperAdmin(data: CreateUserDto): Promise<User> {
    // Check if a user with this email already exists
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    // Ensure the Super Admin role exists
    const superAdminRole = await this.roleRepository.findOne({ where: { name:'super_admin' } });
    if (!superAdminRole) {
      throw new NotFoundException("Super Admin role doesn't exist");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

     // Prepare the user data with the Super Admin role and hashed password
     const userData: Partial<User> = {
      username: data.name,
      email: data.email,
      password: hashedPassword,
      roles: [superAdminRole],
    };

    // Use the create method from BaseService to save the user
    return super.create(userData);
  }

  async createSubAdmin(userData: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userData);
    const subAdminRole = await this.roleRepository.findOne({
      where: { name: Role.SUB_ADMIN },
    });
    if (subAdminRole) {
      user.roles = [subAdminRole];
    }
    return this.userRepository.save(user);
  }

  async assignRoles(userId: string, roleIds: string[]): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const roles = await this.roleRepository.findByIds(roleIds); //.findBy({ id: In([1, 2, 3]) })
    user.roles = roles;

    return this.userRepository.save(user);
  }

  async assignPermissions(
    userId: string,
    permissionIds: string[],
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['permissions'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const permissions =
      await this.permissionRepository.findByIds(permissionIds);
    user.permissions = permissions;
    return this.userRepository.save(user);
  }
}
