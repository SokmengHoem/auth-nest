import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { JwtStrategy } from 'src/common/strategies/jwt-strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    RoleModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '30m'}, //Access totken expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,RoleService, JwtStrategy],
})
export class AuthModule {}
