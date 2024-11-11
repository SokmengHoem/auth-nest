import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PaginatedResponse, PaginationParams } from 'src/common/interfaces/paginated.interface';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
 //authoriz global in user
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-super-admin')
  async createSuperAdmin(@Body() createUserDto: CreateUserDto): Promise<{ data: User; message: string }> {
    const superAdmin = await this.userService.createSuperAdmin(createUserDto);
    return {
      data: superAdmin,
      message: 'Super Admin created successfully',
    };
  }

  @Post()
  //@Roles(Role.SUPER_ADMIN)
  async create(@Body() createUserDto: CreateUserDto): Promise<{ data: User; message: string }> {
    const user = await this.userService.create(createUserDto);
    return {
      data: user,
      message: 'User created successfully',
    }
  }

  @Get()
  @Roles(Role.SUPER_ADMIN)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('paginated')
  async findAllPaginated(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('filters') filters?: Record<string, any>,
    @Query('min') min?: Record<string, number>,
    @Query('max') max?: Record<string, number>,
  ):Promise<PaginatedResponse<User>>{
    const paginationParams: PaginationParams = {page: +page, limit: +limit, sortBy, sortOrder, filters, min, max};
    return this.userService.findAllPaginated(paginationParams,'Users retrieved successfully');
  }

  @Post('sub-admin')
  async createSubAdmin(@Body() createUserDto: CreateUserDto){
    return this.userService.createSubAdmin(createUserDto);
  }

  @Post(':userId/assign-role')
  async assignRoles(
    @Param('userId') userId: string,
    @Body('roleIds') roleIds: string[],
  ){
    return this.userService.assignRoles(userId, roleIds);
  }

  @Post(':userId/assign-permission')
  async assignPermissions(
    @Param('userId') userId: string,
    @Body('permissionIds') permissionIds: string[],
  ){
    return this.userService.assignPermissions(userId, permissionIds);
  }


  @Get(':id')
  //@Permissions(PermissionName.VIEW_USER)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch(':id/soft-delete')
  async softDelete(@Param('id') id: string): Promise<void>{
     await this.userService.softDelete(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string): Promise<void>{
    await this.userService.restore(id);
  }


  @UseGuards(JwtAuthGuard )
  @Get('my-info')
  getProtectedData(@Req() req) {
    console.log('User:', req.user); // Logs the authenticated user info
    return 'This is protected data';
  }
}
