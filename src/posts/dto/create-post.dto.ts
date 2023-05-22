import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;

  @IsNotEmpty()
  readonly body: string;
}
