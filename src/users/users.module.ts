import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [
    UsersService,
    ...usersProviders,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
