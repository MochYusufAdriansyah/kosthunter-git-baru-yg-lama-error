import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Get('kos/:id')
  findByKos(@Param('id') id: string) {
    return this.service.findByKos(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
