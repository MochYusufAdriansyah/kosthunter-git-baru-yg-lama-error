import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async create(data: any) {

    const password = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: { ...data, password }
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }
}
