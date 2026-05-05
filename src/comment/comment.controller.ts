import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('comment')
export class CommentController {

  constructor(private service: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() body) {
    return this.service.create(req.user.sub, body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(Number(id), body);
  }

  @Patch(':id/reply')
  reply(@Param('id') id: string, @Body() body: any) {
    return this.service.reply(Number(id), body.reply);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }

  @Get('kos/:id')
  findByKos(@Param('id') id: string) {
    return this.service.findByKos(Number(id));
  }
}
