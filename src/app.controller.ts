import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './auth/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }
}
