import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { KosModule } from './kos/kos.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    KosModule,
    RoomModule,
    BookingModule,
    CommentModule,
  ],
})
export class AppModule {}
