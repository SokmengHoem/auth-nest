import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'database/data-source';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({
    isGlobal: true
  }), TypeOrmModule.forRoot(dataSourceOptions), AuthModule, PermissionModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
