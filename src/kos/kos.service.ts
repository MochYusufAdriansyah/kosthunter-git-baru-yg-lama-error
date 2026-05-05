import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KosService {

  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.kos.create({
      data
    });
  }

  findAll() {
    return this.prisma.kos.findMany({
      include: {
        rooms: true,
        facilities: true,
        comments: true,
        owner: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.kos.findUnique({
      where: { id },
      include: {
        rooms: true,
        facilities: true,
        comments: true,
        owner: true
      }
    });
  }

  update(id: number, data: any) {
    return this.prisma.kos.update({
      where: { id },
      data
    });
  }

  remove(id: number) {
    return this.prisma.kos.delete({
      where: { id }
    });
  }
}
