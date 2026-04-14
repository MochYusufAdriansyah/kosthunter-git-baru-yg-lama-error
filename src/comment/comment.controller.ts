import { Body, Controller, Get, Param, Post, Patch, Req, UseGuards } from '@nestjs/common';
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

  @Patch(':id/reply')
  reply(@Param('id') id: string, @Body() body) {
    return this.service.reply(Number(id), body.reply);
  }

  @Get('kos/:id')
  findByKos(@Param('id') id: string) {
    return this.service.findByKos(Number(id));
  }
}
