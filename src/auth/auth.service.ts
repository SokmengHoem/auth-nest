import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService
  ) {}

  async signup(
    signupDto: CreateUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Check if the email is already in use
    const existUser = await this.userService.findByEmail(signupDto.email);
    if (existUser) {
      throw new ConflictException('Email is already in use');
    }

    //Hash the password
    const hashedPassword = await this.hashPassword(signupDto.password);

    //Fetch the default role 
    const userRole = await this.roleService.findByName(Role.USER);
    if(!userRole){
      throw new ConflictException('Default role not found');
    }

    //Create a new user
    const newUser = await this.userService.create({
      email: signupDto.email,
      username: signupDto.name,
      password: hashedPassword,
      roles: [userRole],// Assign default role
    });

    // Generate tokens
    const accessToken = this.generateAccessToken(newUser);
    const refreshToken = this.generateRefreshToken(newUser);
    return {accessToken, refreshToken};
  }

  async signin(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  generateAccessToken(user: User): string {
    const payload = { username: user.username, sub: user.id, roles: user.roles };
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(user: User): string {
    const payload = { username: user.username, sub: user.id, roles: user.roles };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
