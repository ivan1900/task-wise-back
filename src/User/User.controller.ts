import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Shared/application/AuthGuard';

@Controller('user')
export class UserController {
  @Get('/me')
  @UseGuards(AuthGuard)
  me() {
    return { message: 'User endpoint is working' };
  }
}
