import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomService {

  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.room.create({
      data
    });
  }

  findAll() {
    return this.prisma.room.findMany({
      include: {
        kos: true,
        bookings: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        kos: true,
        bookings: true
      }
    });
  }

  findByKos(kosId: number) {
    return this.prisma.room.findMany({
      where: { kosId }
    });
  }

  update(id: number, data: any) {
    return this.prisma.room.update({
      where: { id },
      data
    });
  }

  remove(id: number) {
    return this.prisma.room.delete({
      where: { id }
    });
  }
}
