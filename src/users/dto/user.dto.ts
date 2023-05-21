import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  password: string;
}
