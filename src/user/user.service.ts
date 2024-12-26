import { CreateUserDto } from '@/dto/user/create-user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(name: string) {
    return this.prisma.user.findFirst({
      where: {
        name,
      },
    });
  }

  updatePassword(name: string, newPassword: string) {
    return this.prisma.user.update({
      where: {
        name,
      },
      data: {
        password: newPassword,
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        disabled: true,
      },
    });
  }
}
