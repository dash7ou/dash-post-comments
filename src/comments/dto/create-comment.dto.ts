import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  @MinLength(4)
  readonly content: string;

  @IsNotEmpty()
  @IsNumber()
  readonly postId: number;
}
