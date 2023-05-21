import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(UserDto)
  @Post('/signup')
  signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }
}
