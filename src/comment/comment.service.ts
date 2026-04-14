import { Injectable } from '@nestjs/common';
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
}
