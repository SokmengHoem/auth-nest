import {IsNotEmpty, IsOptional, IsString, Length } from "class-validator";


export class UpdatePermissionDto{
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 255)
    readonly slug?: string;
  
    @IsOptional()
    @IsString()
    @IsOptional()
    readonly description?: string;
}