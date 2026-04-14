import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {

  constructor(private service: RoomService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('kos/:id')
  findByKos(@Param('id') id: string) {
    return this.service.findByKos(Number(id));
  }
}
