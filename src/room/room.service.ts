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

  findByKos(kosId: number) {
    return this.prisma.room.findMany({
      where: { kosId }
    });
  }
}
