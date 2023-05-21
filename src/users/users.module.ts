import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, ...usersProviders, AuthService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
