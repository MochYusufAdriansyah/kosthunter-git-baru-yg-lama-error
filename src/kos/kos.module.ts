import { Module } from '@nestjs/common';
import { KosService } from './kos.service';
import { KosController } from './kos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [KosService],
  controllers: [KosController],
})
export class KosModule {}
