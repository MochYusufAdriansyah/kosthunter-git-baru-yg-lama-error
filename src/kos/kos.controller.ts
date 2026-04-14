import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { KosService } from './kos.service';

@Controller('kos')
export class KosController {

  constructor(private service: KosService) {}

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
}
