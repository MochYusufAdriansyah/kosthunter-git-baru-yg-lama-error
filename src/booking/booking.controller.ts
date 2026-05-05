import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('booking')
export class BookingController {

  constructor(private service: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() body) {
    return this.service.create(req.user.sub, body.roomId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMyBookings(@Req() req) {
    return this.service.findByUser(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.service.remove(Number(id), req.user.sub);
  }
}
