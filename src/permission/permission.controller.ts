import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { UpdatePermissionDto } from './dto/update-permission';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(id);
  }

  @UseGuards(JwtAuthGuard )
  @Get()
  findAll(@Req() req) {
    console.log('User:', req.user);
    return this.permissionService.findAll();
  }

  @Get('my')
  getProtectedData(@Req() req) {
    console.log('User:', req); // Logs the authenticated user info
    return 'This is protected data';
  }

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto):Promise<Permission> {
    return await this.permissionService.create(createPermissionDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermission: UpdatePermissionDto,
  ) {
    return this.permissionService.update(id, updatePermission);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(id);
  }

  @Patch(':id/soft-delete')
  async softDelete(@Param('id') id: string): Promise<void> {
    await this.permissionService.softDelete(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string): Promise<void> {
    await this.permissionService.restore(id);
  }
}
