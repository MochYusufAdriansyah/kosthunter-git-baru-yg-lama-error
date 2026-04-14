import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingService {

  constructor(private prisma: PrismaService) {}

  async create(userId: number, roomId: number) {

    const room = await this.prisma.room.findUnique({
      where: { id: roomId }
    });

    if (!room) throw new BadRequestException('Room tidak ada');

    if (room.status !== 'AVAILABLE') {
      throw new BadRequestException('Room sudah dibooking');
    }

    await this.prisma.room.update({
      where: { id: roomId },
      data: { status: 'BOOKED' }
    });

    return this.prisma.booking.create({
      data: { userId, roomId }
    });
  }
}
