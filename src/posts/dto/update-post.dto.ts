import { IsNotEmpty, MinLength, IsOptional, IsString } from 'class-validator';


export class UpdatePostDTO {
  @MinLength(4)
  @IsOptional()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly body: string;
}
