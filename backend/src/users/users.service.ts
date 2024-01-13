import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { User } from '@prisma/client';

import { UserDto, LoginUserDto } from './dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from 'src/auth/jwt.strategy';

interface FormatLogin extends Partial<User> {
  email: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: UserDto): Promise<any> {
    const userInDb = await this.prisma.user.findFirst({
      where: { email: userDto.email },
    });

    if (userInDb)
      throw new HttpException('User already exist!', HttpStatus.CONFLICT);

    return await this.prisma.user.create({
      data: {
        ...userDto,
        password: await hash(userDto.password, 10),
      },
    });
  }

  async findOneByEmail({
    email,
    password,
  }: LoginUserDto): Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

    const areEqual = await compare(password, user.password);

    if (!areEqual)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

    return await this.prisma.user.findUnique({
      where: { id: user.id },
    });
  }

  async findOneById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByPayload({ email }: JwtPayload) {
    return await this.prisma.user.findFirst({ where: { email } });
  }
}
