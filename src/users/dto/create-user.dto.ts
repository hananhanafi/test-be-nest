import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    Contains,
    notContains
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { UserRoleEnum } from '@prisma/client';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({ required: true })
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({ required: true })
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    // @notContains(' ')
    @ApiProperty({ required: true })
    username: string;
    
    @IsString()
    @MinLength(6)
    @ApiProperty({ required: false })
    password: string;
    
    @IsString()
    @ApiProperty({ required: false })
    role: UserRoleEnum;
}
