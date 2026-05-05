import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  findByUser(userId: number) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        room: true,
        user: true
      }
    });
  }

  async remove(id: number, userId: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { room: true }
    });

    if (!booking) throw new NotFoundException('Booking tidak ditemukan');
    if (booking.userId !== userId) throw new ForbiddenException('Akses ditolak');

    await this.prisma.room.update({
      where: { id: booking.roomId },
      data: { status: 'AVAILABLE' }
    });

    return this.prisma.booking.delete({
      where: { id }
    });
  }
}
