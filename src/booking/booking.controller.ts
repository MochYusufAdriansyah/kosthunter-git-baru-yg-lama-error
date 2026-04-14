import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}
