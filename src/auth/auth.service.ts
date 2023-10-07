import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { PrismaService } from './../prisma/prisma.service';
  import { JwtService } from '@nestjs/jwt';
  import { AuthEntity } from './entities/auth.entity';
  import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password)
    .then(function(result) {
      return result
    });
    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });

    //Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({ ...user }),
    };
  }
}
