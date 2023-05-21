import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup({ email, password, name }: CreateUserDto) {
    console.log(email, password, name);
    let user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('this email alreay exist');
    }

    // hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashPassword = `${salt}.${hash.toString('hex')}`;

    user = await this.usersService.create({
      email,
      password: hashPassword,
      name,
    });

    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Check ur email or password!');
    }

    return { id: user.id, name: user.name };
  }

  async login(user: any) {
    console.log(user);
    const token = await this.generateToken(user);
    return { user, token };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }
}
