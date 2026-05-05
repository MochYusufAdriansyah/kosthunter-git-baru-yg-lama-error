import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {

  constructor(private prisma: PrismaService) {}

  create(userId: number, data: any) {
    return this.prisma.comment.create({
      data: {
        content: data.content,
        kosId: data.kosId,
        userId
      }
    });
  }

  reply(commentId: number, reply: string) {
    return this.prisma.comment.update({
      where: { id: commentId },
      data: { reply }
    });
  }

  findByKos(kosId: number) {
    return this.prisma.comment.findMany({
      where: { kosId },
      include: {
        user: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
      include: {
        user: true,
        kos: true
      }
    });
  }

  update(id: number, data: any) {
    return this.prisma.comment.update({
      where: { id },
      data: {
        content: data.content
      }
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.comment.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Comment tidak ditemukan');

    return this.prisma.comment.delete({
      where: { id }
    });
  }
}
