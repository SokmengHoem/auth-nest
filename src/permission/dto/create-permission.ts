import {IsNotEmpty, IsOptional, IsString, Length } from "class-validator";


export class CreatePermissionDto{
    @IsString()
    @IsNotEmpty()
    readonly name: string;
  
    @IsString()
    @Length(1, 255)
    readonly slug: string;
  
    @IsString()
    @IsOptional()
    readonly description?: string;
}