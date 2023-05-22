import { IsNotEmpty, MinLength, IsOptional } from 'class-validator';


export class UpdatePostDTO {
  @IsNotEmpty()
  @MinLength(4)
  @IsOptional()
  readonly title: string;

  @IsNotEmpty()
  @IsOptional()
  readonly body: string;
}
