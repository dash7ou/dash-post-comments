import { Injectable, Inject } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  create(user: UserDto) {
    return this.userRepository.create(user);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findOneById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
