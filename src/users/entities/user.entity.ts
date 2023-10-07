import { User, UserRoleEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
    
    @ApiProperty()
    id: number;
    @ApiProperty()
    email: string;
    @ApiProperty()
    username: string;
    @ApiProperty()
    name: string;
    @Exclude()
    password: string;
    @ApiProperty()
    role: UserRoleEnum;
    @ApiProperty()
    created_date: Date;
    @ApiProperty()
    updated_at: Date;
}
