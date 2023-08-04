// auth.controller.ts
import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ description: 'User Login', type: LoginDto }) // Use LoginDto here
  async login(@Request() req) {
    // Use req.user to access the authenticated user
    // Your logic here
    return this.authService.login(req.user);
  }
}
