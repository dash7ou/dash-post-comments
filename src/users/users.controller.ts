import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(UserDto)
  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
