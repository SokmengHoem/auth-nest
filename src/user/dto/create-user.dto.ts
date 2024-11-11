import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsEmail()
  @IsString()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsArray()
  @IsOptional()
  readonly roleIds?: string[]; // Optional array of role IDs to assign

  @IsArray()
  @IsOptional()
  readonly permissionIds?: string[]; // Optional array of permission IDs to assign
}
